import { Router, type Request, type Response } from "express";
import { getSabiMapsServerProviderConfig, readSabiMapsServerApiKey } from "../../core/maps/sabiMapsServerConfig";

type SabiMapPoint = {
  latitude: number;
  longitude: number;
};

function mapsError(message: string, statusCode: number): Error & { statusCode: number } {
  const error = new Error(message) as Error & { statusCode: number };
  error.statusCode = statusCode;
  return error;
}

function readMapsKey(): string {
  const key = String(process.env.SABI_GOOGLE_MAPS_SERVER_API_KEY || "").trim();

  if (!key) {
    throw mapsError("maps_provider_not_configured", 503);
  }

  return key;
}

function numberParam(value: unknown, name: string): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw mapsError("invalid_" + name.replace(/[^a-z0-9_]/gi, "_").toLowerCase(), 400);
  }

  return parsed;
}

function readPoint(value: unknown, name: string): SabiMapPoint {
  const source =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};

  return {
    latitude: numberParam(source.latitude, name + ".latitude"),
    longitude: numberParam(source.longitude, name + ".longitude"),
  };
}

async function providerFetchJson(url: string): Promise<Record<string, unknown>> {
  const fetchImpl = (globalThis as unknown as {
    fetch?: (input: string) => Promise<{
      ok: boolean;
      status: number;
      json: () => Promise<unknown>;
    }>;
  }).fetch;

  if (!fetchImpl) {
    throw mapsError("server_fetch_not_available", 500);
  }

  const key = readMapsKey();
  const separator = url.includes("?") ? "&" : "?";
  const response = await fetchImpl(url + separator + "key=" + encodeURIComponent(key));
  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw mapsError("maps_provider_request_failed", 502);
  }

  return payload as Record<string, unknown>;
}

async function providerFetchBinary(url: string): Promise<{
  contentType: string;
  body: Buffer;
}> {
  const fetchImpl = (globalThis as unknown as {
    fetch?: (input: string) => Promise<{
      ok: boolean;
      status: number;
      headers: { get: (name: string) => string | null };
      arrayBuffer: () => Promise<ArrayBuffer>;
    }>;
  }).fetch;

  if (!fetchImpl) {
    throw mapsError("server_fetch_not_available", 500);
  }

  const response = await fetchImpl(url);

  if (!response.ok) {
    throw mapsError("maps_static_request_failed", 502);
  }

  return {
    contentType: response.headers.get("content-type") || "image/png",
    body: Buffer.from(await response.arrayBuffer()),
  };
}

function sendMapsError(res: Response, error: unknown): void {
  const statusCode =
    error &&
    typeof error === "object" &&
    "statusCode" in error &&
    Number.isFinite(Number((error as { statusCode?: unknown }).statusCode))
      ? Number((error as { statusCode?: unknown }).statusCode)
      : 500;

  const code = error instanceof Error ? error.message : "maps_error";

  res.status(statusCode).json({
    ok: false,
    error: code,
    provider: "sabi-maps-proxy",
  });
}

export function createSabiMapsProxyRouter(): Router {
  const router = Router();

  router.get("/status", (_req: Request, res: Response) => {
    res.json({
      ok: true,
      provider: "sabi-maps-proxy",
      ...getSabiMapsServerProviderConfig(),
    });
  });

  router.get("/reverse-geocode", async (req: Request, res: Response) => {
    try {
      const latitude = numberParam(req.query.latitude, "latitude");
      const longitude = numberParam(req.query.longitude, "longitude");

      const payload = await providerFetchJson(
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          encodeURIComponent(latitude + "," + longitude),
      );

      const results = Array.isArray(payload.results) ? payload.results : [];
      const first =
        results[0] && typeof results[0] === "object"
          ? (results[0] as Record<string, unknown>)
          : {};

      res.json({
        ok: true,
        address: String(first.formatted_address || ""),
        point: { latitude, longitude },
        provider: "sabi-maps-proxy",
      });
    } catch (error) {
      sendMapsError(res, error);
    }
  });

  router.get("/places", async (req: Request, res: Response) => {
    try {
      const q = String(req.query.q || "").trim();

      if (!q) {
        return res.json({ ok: true, items: [], provider: "sabi-maps-proxy" });
      }

      const payload = await providerFetchJson(
        "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" +
          encodeURIComponent(q),
      );

      const predictions = Array.isArray(payload.predictions) ? payload.predictions : [];

      res.json({
        ok: true,
        provider: "sabi-maps-proxy",
        items: predictions.slice(0, 8).map((item) => {
          const source =
            item && typeof item === "object" && !Array.isArray(item)
              ? (item as Record<string, unknown>)
              : {};
          const structured =
            source.structured_formatting &&
            typeof source.structured_formatting === "object" &&
            !Array.isArray(source.structured_formatting)
              ? (source.structured_formatting as Record<string, unknown>)
              : {};

          return {
            id: String(source.place_id || source.id || ""),
            title: String(structured.main_text || source.description || ""),
            subtitle: String(structured.secondary_text || ""),
          };
        }),
      });
    } catch (error) {
      sendMapsError(res, error);
    }
  });

  router.post("/route", async (req: Request, res: Response) => {
    try {
      const body =
        req.body && typeof req.body === "object" && !Array.isArray(req.body)
          ? (req.body as Record<string, unknown>)
          : {};

      const origin = readPoint(body.origin, "origin");
      const destination = readPoint(body.destination, "destination");

      const payload = await providerFetchJson(
        "https://maps.googleapis.com/maps/api/directions/json?origin=" +
          encodeURIComponent(origin.latitude + "," + origin.longitude) +
          "&destination=" +
          encodeURIComponent(destination.latitude + "," + destination.longitude),
      );

      const routes = Array.isArray(payload.routes) ? payload.routes : [];
      const route =
        routes[0] && typeof routes[0] === "object"
          ? (routes[0] as Record<string, unknown>)
          : {};
      const legs = Array.isArray(route.legs) ? route.legs : [];
      const leg =
        legs[0] && typeof legs[0] === "object"
          ? (legs[0] as Record<string, unknown>)
          : {};
      const distance =
        leg.distance && typeof leg.distance === "object"
          ? (leg.distance as Record<string, unknown>)
          : {};
      const duration =
        leg.duration && typeof leg.duration === "object"
          ? (leg.duration as Record<string, unknown>)
          : {};
      const polyline =
        route.overview_polyline && typeof route.overview_polyline === "object"
          ? (route.overview_polyline as Record<string, unknown>)
          : {};

      res.json({
        ok: true,
        distanceMeters: Number(distance.value || 0),
        durationSeconds: Number(duration.value || 0),
        polyline: String(polyline.points || ""),
        provider: "sabi-maps-proxy",
      });
    } catch (error) {
      sendMapsError(res, error);
    }
  });

  router.get("/static", async (req: Request, res: Response) => {
    try {
      const latitude = numberParam(req.query.latitude, "latitude");
      const longitude = numberParam(req.query.longitude, "longitude");
      const zoom = Number.isFinite(Number(req.query.zoom)) ? Number(req.query.zoom) : 15;
      const key = readMapsKey();

      const url =
        "https://maps.googleapis.com/maps/api/staticmap?center=" +
        encodeURIComponent(latitude + "," + longitude) +
        "&zoom=" +
        encodeURIComponent(String(zoom)) +
        "&size=640x360&scale=2&markers=color:blue%7C" +
        encodeURIComponent(latitude + "," + longitude) +
        "&key=" +
        encodeURIComponent(key);

      const image = await providerFetchBinary(url);
      res.setHeader("Content-Type", image.contentType);
      res.send(image.body);
    } catch (error) {
      sendMapsError(res, error);
    }
  });

  return router;
}

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function file(rel) {
  return path.join(ROOT, rel);
}

function read(rel) {
  return fs.readFileSync(file(rel), "utf8");
}

function write(rel, content) {
  const full = file(rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
  console.log("WRITE", rel);
}

write("mobile/src/shared/firebase/firebasePhoneAuth.ts", `import auth from "@react-native-firebase/auth";

export type FirebasePhoneRequestResult = {
  phone: string;
  firebaseVerificationId?: string;
  provider: "firebase_phone";
};

export type FirebasePhoneVerifyResult = {
  phone: string;
  firebaseUid: string;
  idToken: string;
};

type FirebaseConfirmationResultLike = {
  verificationId?: string;
  confirm: (code: string) => Promise<{
    user?: {
      uid?: string | null;
      phoneNumber?: string | null;
      getIdToken?: (forceRefresh?: boolean) => Promise<string>;
    } | null;
  } | null>;
};

const confirmationsByPhone = new Map<string, FirebaseConfirmationResultLike>();

function normalizePhone(value: string): string {
  return String(value || "").trim();
}

function getFirebaseAuthInstance() {
  try {
    return auth();
  } catch {
    return null;
  }
}

export async function requestFirebasePhoneCode(phone: string): Promise<FirebasePhoneRequestResult> {
  const normalizedPhone = normalizePhone(phone);

  if (!normalizedPhone) {
    throw new Error("Firebase phone number is required.");
  }

  const firebaseAuth = getFirebaseAuthInstance();

  if (!firebaseAuth || typeof firebaseAuth.signInWithPhoneNumber !== "function") {
    throw new Error("Firebase native phone auth is not available.");
  }

  const confirmation = (await firebaseAuth.signInWithPhoneNumber(
    normalizedPhone,
  )) as FirebaseConfirmationResultLike;

  confirmationsByPhone.set(normalizedPhone, confirmation);

  return {
    phone: normalizedPhone,
    firebaseVerificationId: confirmation.verificationId,
    provider: "firebase_phone",
  };
}

export async function verifyFirebasePhoneCode(
  phone: string,
  code: string,
): Promise<FirebasePhoneVerifyResult> {
  const normalizedPhone = normalizePhone(phone);
  const normalizedCode = String(code || "").trim();

  if (!normalizedPhone) {
    throw new Error("Firebase phone number is required.");
  }

  if (!normalizedCode) {
    throw new Error("Firebase verification code is required.");
  }

  const confirmation = confirmationsByPhone.get(normalizedPhone);

  if (!confirmation) {
    throw new Error("Firebase confirmation session is missing. Request a new code.");
  }

  const credential = await confirmation.confirm(normalizedCode);
  const user = credential?.user;

  const firebaseUid = String(user?.uid || "").trim();
  const idToken =
    typeof user?.getIdToken === "function"
      ? String(await user.getIdToken(true)).trim()
      : "";
  const firebasePhone = String(user?.phoneNumber || normalizedPhone).trim();

  if (!firebaseUid || !idToken) {
    throw new Error("Firebase phone verification did not return an ID token.");
  }

  confirmationsByPhone.delete(normalizedPhone);

  return {
    phone: firebasePhone || normalizedPhone,
    firebaseUid,
    idToken,
  };
}
`);

let authApi = read("mobile/src/shared/api/auth-api.ts");

if (!authApi.includes("../firebase/firebasePhoneAuth")) {
  authApi = authApi.replace(
    'import { getSabiApiBaseUrlCandidates, resolveSabiApiBaseUrl } from "./apiBaseUrl";',
    'import { getSabiApiBaseUrlCandidates, resolveSabiApiBaseUrl } from "./apiBaseUrl";\nimport { requestFirebasePhoneCode, verifyFirebasePhoneCode } from "../firebase/firebasePhoneAuth";'
  );
}

if (!authApi.includes("FIREBASE_VERIFY_ENDPOINT_CANDIDATES")) {
  authApi = authApi.replace(
`const VERIFY_ENDPOINT_CANDIDATES = [
  "/auth/verify",
  "/api/auth/verify",
  "/api/v2/auth/verify",
  "/auth/otp/verify",
  "/api/auth/otp/verify",
  "/api/v2/auth/otp/verify",
  "/verify",
] as const;`,
`const VERIFY_ENDPOINT_CANDIDATES = [
  "/auth/verify",
  "/api/auth/verify",
  "/api/v2/auth/verify",
  "/auth/otp/verify",
  "/api/auth/otp/verify",
  "/api/v2/auth/otp/verify",
  "/verify",
] as const;

const FIREBASE_VERIFY_ENDPOINT_CANDIDATES = [
  "/auth/firebase/verify",
  "/api/auth/firebase/verify",
  "/api/v2/auth/firebase/verify",
  "/auth/phone/firebase/verify",
  "/api/auth/phone/firebase/verify",
  "/api/v2/auth/phone/firebase/verify",
] as const;`
  );
}

authApi = authApi.replace(
`export type RequestOtpResponse = {
  apiBaseUrl: string;
  phone: string;
  expiresAt?: string;
  otpCode?: string;
};`,
`export type RequestOtpResponse = {
  apiBaseUrl: string;
  phone: string;
  expiresAt?: string;
  otpCode?: string;
  provider?: "firebase_phone" | "server_otp";
  firebaseVerificationId?: string;
};`
);

if (!authApi.includes("exchangeFirebaseIdTokenForSabiSession")) {
  authApi = authApi.replace(
`async function callAuthorizedEndpoint(
  method: "POST" | "DELETE",
  endpoints: readonly string[],
  session: AuthenticatedApiSession,
): Promise<Record<string, unknown>> {`,
`async function exchangeFirebaseIdTokenForSabiSession(
  idToken: string,
  apiBaseUrl?: string | null,
): Promise<VerifyOtpSession> {
  const normalizedToken = idToken.trim();

  if (!normalizedToken) {
    throw new Error("Firebase ID token is required.");
  }

  const errors: string[] = [];
  const baseUrls = getAuthApiBaseUrlCandidates(apiBaseUrl);

  for (const baseUrl of baseUrls) {
    for (const endpoint of FIREBASE_VERIFY_ENDPOINT_CANDIDATES) {
      try {
        const response = await postJsonRequest(endpoint, { idToken: normalizedToken }, baseUrl);

        if (response.status === 404) {
          errors.push(\`\${baseUrl}\${endpoint}: endpoint not found\`);
          continue;
        }

        const json = await parseJsonSafe(response);

        if (!response.ok) {
          const payload = readPayload(json);
          const message =
            asString(payload.message) ||
            asString(payload.error) ||
            \`Firebase verify failed with status \${response.status}.\`;

          errors.push(\`\${baseUrl}\${endpoint}: \${message}\`);
          continue;
        }

        const payload = readPayload(json);
        const accessToken = extractAccessToken(payload);
        const refreshToken = extractRefreshToken(payload);
        const currentUserId = extractUserId(payload);

        if (!accessToken || !currentUserId) {
          errors.push(\`\${baseUrl}\${endpoint}: response does not contain accessToken/userId.\`);
          continue;
        }

        return {
          apiBaseUrl: baseUrl,
          accessToken,
          refreshToken: refreshToken || null,
          currentUserId,
          profileCompleted: extractProfileCompleted(payload),
          profile: extractProfile(payload),
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown Firebase verify exchange error.";
        errors.push(\`\${baseUrl}\${endpoint}: \${message}\`);
      }
    }
  }

  throw new Error(
    \`Firebase token exchange failed. Tried \${baseUrls.join(", ")}. \${errors.join(" | ")}\`,
  );
}

async function callAuthorizedEndpoint(
  method: "POST" | "DELETE",
  endpoints: readonly string[],
  session: AuthenticatedApiSession,
): Promise<Record<string, unknown>> {`
  );
}

authApi = authApi.replace(
`  const errors: string[] = [];
  const baseUrls = getAuthApiBaseUrlCandidates(request.apiBaseUrl);

  for (const apiBaseUrl of baseUrls) {`,
`  try {
    const firebaseResult = await requestFirebasePhoneCode(phone);

    return {
      apiBaseUrl: getAuthApiBaseUrlCandidates(request.apiBaseUrl)[0] ?? getAuthApiBaseUrl(),
      phone: firebaseResult.phone,
      provider: firebaseResult.provider,
      firebaseVerificationId: firebaseResult.firebaseVerificationId,
    };
  } catch (firebaseError) {
    console.warn(
      "[auth-api] Firebase phone request unavailable, falling back to server OTP",
      firebaseError instanceof Error ? firebaseError.message : firebaseError,
    );
  }

  const errors: string[] = [];
  const baseUrls = getAuthApiBaseUrlCandidates(request.apiBaseUrl);

  for (const apiBaseUrl of baseUrls) {`
);

authApi = authApi.replace(
`  const errors: string[] = [];
  const baseUrls = getAuthApiBaseUrlCandidates(request.apiBaseUrl);

  for (const apiBaseUrl of baseUrls) {`,
`  try {
    const firebaseVerified = await verifyFirebasePhoneCode(phone, code);
    return await exchangeFirebaseIdTokenForSabiSession(firebaseVerified.idToken, request.apiBaseUrl);
  } catch (firebaseError) {
    console.warn(
      "[auth-api] Firebase phone verify unavailable, falling back to server OTP",
      firebaseError instanceof Error ? firebaseError.message : firebaseError,
    );
  }

  const errors: string[] = [];
  const baseUrls = getAuthApiBaseUrlCandidates(request.apiBaseUrl);

  for (const apiBaseUrl of baseUrls) {`
);

write("mobile/src/shared/api/auth-api.ts", authApi);

console.log("FIREBASE-REGISTRATION-001E PATCH APPLIED");

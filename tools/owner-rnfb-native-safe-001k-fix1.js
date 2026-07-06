const fs = require("fs");

const target = "mobile/src/shared/firebase/firebasePhoneAuth.ts";

const content = `export type FirebasePhoneRequestResult = {
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

type FirebaseAuthLike = {
  signInWithPhoneNumber?: (phoneNumber: string) => Promise<FirebaseConfirmationResultLike>;
};

type FirebaseAuthFactory = () => FirebaseAuthLike;

type FirebaseAuthModuleLike =
  | FirebaseAuthFactory
  | {
      default?: FirebaseAuthFactory;
    };

declare const require: (moduleName: string) => unknown;

const confirmationsByPhone = new Map<string, FirebaseConfirmationResultLike>();

function normalizePhone(value: string): string {
  return String(value || "").trim();
}

function loadFirebaseAuthFactory(): FirebaseAuthFactory | null {
  try {
    const loaded = require("@react-native-firebase/auth") as FirebaseAuthModuleLike;

    if (typeof loaded === "function") {
      return loaded;
    }

    if (loaded && typeof loaded.default === "function") {
      return loaded.default;
    }

    return null;
  } catch {
    return null;
  }
}

function getFirebaseAuthInstance(): FirebaseAuthLike | null {
  const authFactory = loadFirebaseAuthFactory();

  if (!authFactory) {
    return null;
  }

  try {
    return authFactory();
  } catch {
    return null;
  }
}

export function isFirebaseNativePhoneAuthAvailable(): boolean {
  const firebaseAuth = getFirebaseAuthInstance();
  return Boolean(firebaseAuth && typeof firebaseAuth.signInWithPhoneNumber === "function");
}

export async function requestFirebasePhoneCode(phone: string): Promise<FirebasePhoneRequestResult> {
  const normalizedPhone = normalizePhone(phone);

  if (!normalizedPhone) {
    throw new Error("Firebase phone number is required.");
  }

  const firebaseAuth = getFirebaseAuthInstance();

  if (!firebaseAuth || typeof firebaseAuth.signInWithPhoneNumber !== "function") {
    throw new Error(
      "Firebase native phone auth is not available in this installed app build. Rebuild Android dev client/native APK with @react-native-firebase modules.",
    );
  }

  const confirmation = await firebaseAuth.signInWithPhoneNumber(normalizedPhone);

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
`;

fs.writeFileSync(target, content, "utf8");

fs.writeFileSync("tools/owner-rnfb-native-safe-001k-fix1.js", fs.readFileSync(__filename, "utf8"), "utf8");

console.log("OWNER-RNFB-NATIVE-SAFE-001K-FIX1 APPLIED");
console.log("FIXED", target);

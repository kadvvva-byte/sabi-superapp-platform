import auth from "@react-native-firebase/auth";

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

const fs = require("fs");

const p = "mobile/src/shared/api/auth-api.ts";
let c = fs.readFileSync(p, "utf8");

const misplacedVerifyBlock = `

  try {
    const firebaseVerified = await verifyFirebasePhoneCode(phone, code);
    return await exchangeFirebaseIdTokenForSabiSession(firebaseVerified.idToken, request.apiBaseUrl);
  } catch (firebaseError) {
    console.warn(
      "[auth-api] Firebase phone verify unavailable, falling back to server OTP",
      firebaseError instanceof Error ? firebaseError.message : firebaseError,
    );
  }
`;

if (c.includes(misplacedVerifyBlock)) {
  c = c.replace(misplacedVerifyBlock, "\n");
}

const verifyInsertNeedle = `  if (!code) {
    throw new Error("Verification code is required.");
  }

  const errors: string[] = [];
  const baseUrls = getAuthApiBaseUrlCandidates(request.apiBaseUrl);`;

const verifyInsertBlock = `  if (!code) {
    throw new Error("Verification code is required.");
  }

  try {
    const firebaseVerified = await verifyFirebasePhoneCode(phone, code);
    return await exchangeFirebaseIdTokenForSabiSession(firebaseVerified.idToken, request.apiBaseUrl);
  } catch (firebaseError) {
    console.warn(
      "[auth-api] Firebase phone verify unavailable, falling back to server OTP",
      firebaseError instanceof Error ? firebaseError.message : firebaseError,
    );
  }

  const errors: string[] = [];
  const baseUrls = getAuthApiBaseUrlCandidates(request.apiBaseUrl);`;

if (!c.includes("const firebaseVerified = await verifyFirebasePhoneCode(phone, code);")) {
  c = c.replace(verifyInsertNeedle, verifyInsertBlock);
}

fs.writeFileSync(p, c, "utf8");
console.log("FIXED Firebase verify block placement in auth-api.ts");

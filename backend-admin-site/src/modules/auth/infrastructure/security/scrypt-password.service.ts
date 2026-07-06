import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "crypto";
import { promisify } from "util";
import {
  PasswordHasherPort,
  PasswordVerifierPort,
} from "../../application/ports/password-hasher.port";

const scrypt = promisify(scryptCallback);
const SALT_LENGTH = 16;
const KEY_LENGTH = 64;

export class ScryptPasswordService
  implements PasswordHasherPort, PasswordVerifierPort
{
  public async hash(password: string): Promise<string> {
    const normalized = password.trim();

    if (!normalized) {
      throw new Error("Password is required.");
    }

    const salt = randomBytes(SALT_LENGTH).toString("hex");
    const derivedKey = (await scrypt(normalized, salt, KEY_LENGTH)) as Buffer;

    return `${salt}:${derivedKey.toString("hex")}`;
  }

  public async compare(plain: string, hash: string): Promise<boolean> {
    const [salt, storedHex] = hash.split(":");

    if (!salt || !storedHex) {
      return false;
    }

    const derivedKey = (await scrypt(plain, salt, KEY_LENGTH)) as Buffer;
    const storedKey = Buffer.from(storedHex, "hex");

    if (derivedKey.length !== storedKey.length) {
      return false;
    }

    return timingSafeEqual(derivedKey, storedKey);
  }
}
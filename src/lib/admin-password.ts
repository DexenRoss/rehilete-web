import {
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
  type ScryptOptions,
} from "node:crypto";

function scrypt(
  password: string,
  salt: string,
  keyLength: number,
  options: ScryptOptions,
) {
  return new Promise<Buffer>((resolve, reject) => {
    scryptCallback(password, salt, keyLength, options, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(derivedKey);
    });
  });
}

const keyLength = 64;
const scryptOptions = {
  N: 16384,
  r: 8,
  p: 1,
} as const;

export async function hashAdminPassword(password: string) {
  const salt = randomBytes(16).toString("base64url");
  const derivedKey = await scrypt(password, salt, keyLength, scryptOptions);

  return [
    "scrypt",
    scryptOptions.N,
    scryptOptions.r,
    scryptOptions.p,
    salt,
    derivedKey.toString("base64url"),
  ].join("$");
}

export async function verifyAdminPassword(password: string, hash: string) {
  const [algorithm, nValue, rValue, pValue, salt, key] = hash.split("$");

  if (algorithm !== "scrypt" || !nValue || !rValue || !pValue || !salt || !key) {
    return false;
  }

  const storedKey = Buffer.from(key, "base64url");
  const derivedKey = await scrypt(password, salt, storedKey.length, {
    N: Number(nValue),
    r: Number(rValue),
    p: Number(pValue),
  });

  if (storedKey.length !== derivedKey.length) return false;

  return timingSafeEqual(storedKey, derivedKey);
}
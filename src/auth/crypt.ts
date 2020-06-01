import crypto from 'crypto';

const { GALLERY_APP_SALT } = process.env;

export function encryptPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, GALLERY_APP_SALT, 10, 64, 'sha512', (error: Error | null, derivedKey: Buffer) => {
      error ? reject(error) : resolve(derivedKey.toString('hex'));
    });
  });
}

export async function verifyPassword(rawPassword: string, encryptedPassword: string): Promise<boolean> {
  return encryptedPassword === (await encryptPassword(rawPassword));
}

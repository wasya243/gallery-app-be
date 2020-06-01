import crypto from 'crypto';

// TODO: move into env variable
const GALLERY_APP_SALT = '9ZzcETl2Tr0UljvfQmo7EPI0YNxW8mj7';

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

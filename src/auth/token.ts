import * as jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;
const algorithm = 'HS512';

export function sign(payload: string | Buffer | object, expiresIn = '3h'): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, { algorithm, expiresIn }, (err: Error, token: string) => {
      return err ? reject(err) : resolve(token);
    });
  });
}

export function verify(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, { algorithms: [algorithm] }, (error: Error, payload: any) => (error ? reject(error) : resolve(payload)));
  });
}

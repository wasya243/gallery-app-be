import * as jwt from 'jsonwebtoken';

// TODO: move into env variable
const secret = `TZL5nL($\`a^P7bE<hA)p#ZS%g@(xD0`;
const algorithm = 'HS512';

export function sign(payload: string | Buffer | object, expiresIn = '3h'): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { algorithm, expiresIn }, (err: Error, token: string) => {
      return err ? reject(err) : resolve(token);
    });
  });
}

export function verify(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, { algorithms: [algorithm] }, (error: Error, payload: any) => (error ? reject(error) : resolve(payload)));
  });
}

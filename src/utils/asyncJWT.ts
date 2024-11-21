import jwt from "jsonwebtoken";

export const signAsync = (payload: string | Buffer | object, secretKey: jwt.Secret | jwt.PrivateKey, options?: jwt.SignOptions) : Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        try {
            resolve(jwt.sign(payload, secretKey, options));
        } catch (err) {
            reject(err);
        }
    });
}

export const verifyAsync = (token: string, secretKey: jwt.Secret) : Promise<jwt.JwtPayload | string | any> => {
    return new Promise<jwt.JwtPayload | string>((resolve, reject) => {
        try {
            resolve(jwt.verify(token, secretKey));
        } catch (err) {
            reject(err);
        }
    });
}
import { Injectable } from '@nestjs/common';
import aws = require('aws-sdk');
import jwt, { JwtHeader, SigningKeyCallback } from "jsonwebtoken";
import jwksClient from "jwks-rsa";

@Injectable()
export class UserService {
  private client: jwksClient.JwksClient

  constructor() {
    this.client = jwksClient({
      jwksUri:
        `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
    });
  }

  getKey(header: JwtHeader, callback: SigningKeyCallback) {
    if (!header.kid) throw new Error("not found kid!");
    this.client.getSigningKey(header.kid, (err, key) => {
      if (err) throw err;
      callback(null, key.getPublicKey());
    });
  }

  verify(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.getKey.bind(this), (err, decoded) => {
        err ? reject(err) : resolve(decoded);
      });
    })
  }
}

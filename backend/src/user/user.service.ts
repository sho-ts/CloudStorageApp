import { Injectable } from '@nestjs/common';
import aws = require('aws-sdk');
import AmazonCognitoIdentity = require('amazon-cognito-identity-js');

@Injectable()
export class UserService {
  cognitoIdentity: aws.CognitoIdentityServiceProvider;

  constructor() {
  }

  cognitoSignup(username: string, password: string): Promise<AmazonCognitoIdentity.ISignUpResult | Error> {
    const poolData = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId: process.env.COGNITO_CLIENT_ID
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    aws.config.region = process.env.COGNITO_REGION;
    aws.config.credentials = new aws.CognitoIdentityCredentials({
      IdentityPoolId: process.env.COGNITO_IDENTITY_POOL_ID
    });

    return new Promise((resolve, reject) => {
      userPool.signUp(username, password, [], null, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      });
    })
  }

  signin(email: string, password: string) {

  }
}

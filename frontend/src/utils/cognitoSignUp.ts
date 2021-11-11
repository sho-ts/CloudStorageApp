import aws from 'aws-sdk'
import { CognitoUserPool, ISignUpResult } from 'amazon-cognito-identity-js';

const cognitoSignUp = (username: string, password: string): Promise<ISignUpResult | Error> => {
  const poolData = {
    UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? '',
    ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ?? '',
  };

  const userPool = new CognitoUserPool(poolData);

  aws.config.region = process.env.NEXT_PUBLIC_COGNITO_REGION;
  aws.config.credentials = new aws.CognitoIdentityCredentials({
    IdentityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID ?? ''
  });

  return new Promise((resolve, reject) => {
    userPool.signUp(username, password, [], [], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result!)
      }
    });
  })
};

export default cognitoSignUp;
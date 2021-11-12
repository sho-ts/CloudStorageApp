import aws from 'aws-sdk'
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';

const getCognitoUser = (): Promise<CognitoUserAttribute[] | Error> => {
  const userPool = new CognitoUserPool({
    UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? '',
    ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ?? '',
  });

  const cognitoUser = userPool.getCurrentUser();

  aws.config.region = process.env.NEXT_PUBLIC_COGNITO_REGION;
  aws.config.credentials = new aws.CognitoIdentityCredentials({
    IdentityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID ?? ''
  });

  return new Promise((resolve, reject) => {
    if (!cognitoUser) reject(new Error('データが存在しません'));

    cognitoUser?.getSession((error: Error) => {
      if (error) reject(error);

      cognitoUser.getUserAttributes((error, result) => {
        if (error || !result) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    })
  });
}

export default getCognitoUser;
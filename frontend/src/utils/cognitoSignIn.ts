import aws from 'aws-sdk'
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

const cognitoSignIn = async (username: string, password: string): Promise<{
  idToken: string,
  accessToken: string,
  refreshToken: string
} | Error> => {
  const userPool = new CognitoUserPool({
    UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? '',
    ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ?? '',
  });

  aws.config.region = process.env.NEXT_PUBLIC_COGNITO_REGION;
  aws.config.credentials = new aws.CognitoIdentityCredentials({
    IdentityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID ?? ''
  });

  const authenticationDetails = new AuthenticationDetails({
    Username: username,
    Password: password
  });

  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool
  })

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        const idToken = result.getIdToken().getJwtToken();
        const accessToken = result.getAccessToken().getJwtToken();
        const refreshToken = result.getRefreshToken().getToken();

        resolve({
          idToken,
          accessToken,
          refreshToken
        })
      },

      onFailure: err => reject(err)
    });
  });
}

export default cognitoSignIn;
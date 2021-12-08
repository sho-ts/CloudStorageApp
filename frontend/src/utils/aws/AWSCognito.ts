import AWS from 'aws-sdk'
import { CognitoUserPool, AuthenticationDetails, CognitoUser, CognitoUserAttribute, ISignUpResult } from 'amazon-cognito-identity-js';

class AWSCognito {
  private userPool: CognitoUserPool;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? '',
      ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ?? '',
    });

    AWS.config.region = process.env.NEXT_PUBLIC_COGNITO_REGION;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID ?? ''
    });
  }

  signup = (username: string, password: string) => {
    return new Promise<ISignUpResult | Error>((resolve, reject) => {
      this.userPool.signUp(username, password, [], [], (error, result) => {
        error ? reject(error) :
          !result ? reject(new Error('result is undefined: signUp')) :
            resolve(result);
      });
    })
  }

  signin = (username: string, password: string) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password
    });

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.userPool
    })

    return new Promise<{
      idToken: string,
      accessToken: string,
      refreshToken: string
    } | Error>((resolve, reject) => {
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

  signout = () => {
    const cognitoUser = this.userPool.getCurrentUser();

    return new Promise<boolean | Error>((resolve, reject) => {
      cognitoUser ?
        cognitoUser.signOut(resolve.bind(null, true)) :
        reject(new Error('cognitoUser is undefined: signout'));
    });
  }

  activate = (username: string, code: string) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.userPool
    })

    return new Promise<boolean | Error>((resolve, reject) => cognitoUser.confirmRegistration(code, true, error => error ? reject(error) : resolve(true)));
  }

  getToken = (token: string) => {
    const key = Object.keys(localStorage).find(storage => storage.includes(token) && storage.includes('Cognito'))

    if (key) return localStorage[key];

    return;
  };

  /** cognitoUserのAttributeを取得する */
  getCognitoUserAttribute = (cognitoUserAttribute: CognitoUserAttribute[], attributeName: string) => cognitoUserAttribute.find(attribute => attribute.Name === attributeName)?.Value ?? '';

  getAccessToken = () => this.getToken('accessToken');

  getIdToken = () => this.getToken('idToken');

  getRefreshToken = () => this.getToken('refreshToken');

  getUser = () => {
    const cognitoUser = this.userPool.getCurrentUser();

    return new Promise<{
      getCognitoUserAttribute: (attributeName: string) => string | void
    } | void>((resolve) => {
      cognitoUser || resolve();

      cognitoUser?.getSession((error?: Error) => {
        error && resolve();

        cognitoUser.getUserAttributes((error, result) => {
          error ? resolve() :
            !result ? resolve() :
              resolve({
                getCognitoUserAttribute: (attributeName: string) => this.getCognitoUserAttribute(result, attributeName)
              });
        });
      })
    });
  }
}

export default AWSCognito;
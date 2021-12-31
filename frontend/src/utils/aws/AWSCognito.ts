import AWS, { CognitoIdentityServiceProvider } from 'aws-sdk'
import { CognitoUserPool, AuthenticationDetails, CognitoUser, CognitoUserAttribute, ISignUpResult } from 'amazon-cognito-identity-js';
import { createCognitoUserAttributes } from '@/utils';

class AWSCognito {
  private userPool: CognitoUserPool;
  private service: CognitoIdentityServiceProvider;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? '',
      ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ?? '',
    });
    this.service = new CognitoIdentityServiceProvider({
      accessKeyId: process.env.NEXT_PUBLIC_COGNITO_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_COGNITO_SECRET_KEY,
      region: process.env.NEXT_PUBLIC_COGNITO_REGION,
    })

    AWS.config.region = process.env.NEXT_PUBLIC_COGNITO_REGION;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID ?? ''
    });
  }

  signup = (email: string, password: string, name: string) => {
    return new Promise<ISignUpResult | Error>((resolve, reject) => {
      this.userPool.signUp(email, password, [
        ...createCognitoUserAttributes({
          name,
        }),
      ], [], (error, result) => {
        error ? reject(error) :
          !result ? reject(new Error('result is undefined: signUp')) :
            resolve(result);
      });
    })
  }

  signin = (Username: string, Password: string) => {
    const authenticationDetails = new AuthenticationDetails({
      Username,
      Password,
    });

    const cognitoUser = new CognitoUser({
      Username,
      Pool: this.userPool,
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

  /** ユーザー情報の更新（subは変更不可） */
  updateUserAttributes = async (UserAttributes: {
    Name: string,
    Value: string
  }[]) => {
    const cognitoUser = this.userPool.getCurrentUser();

    if (cognitoUser) {
      try {
        await this.service.adminUpdateUserAttributes({
          UserPoolId: this.userPool.getUserPoolId(),
          Username: cognitoUser.getUsername(),
          UserAttributes
        }).promise();
      } catch (e) {
        console.log(e)
      }
    }
  }

  getSession = (cognitoUser: CognitoUser) => {
    return new Promise<void>((resolve, reject) => {
      cognitoUser.getSession((error?: Error) => {
        error ? reject(error) : resolve();
      })
    })
  }

  getToken = (token: string): string | void => {
    const key = Object.keys(localStorage).find(storage => storage.includes(token) && storage.includes('Cognito'))

    if (key) return localStorage[key];

    return;
  };

  /** cognitoUserのAttributeを取得する */
  getCognitoUserAttribute = (cognitoUserAttribute: CognitoUserAttribute[], attributeName: string) => cognitoUserAttribute.find(attribute => attribute.Name === attributeName)?.Value ?? '';

  getAccessToken = () => this.getToken('accessToken');

  getIdToken = () => this.getToken('idToken');

  getRefreshToken = () => this.getToken('refreshToken');

  getIdTokenAndUser = async () => {
    const user = await this.getUser();

    return {
      user, token: this.getToken('idToken')
    }
  }

  getAccessTokenAndUser = async () => {
    const user = await this.getUser();

    return {
      user, token: this.getToken('accessToken'),
    }
  }

  getUser = () => {
    const cognitoUser = this.userPool.getCurrentUser();

    return new Promise<{
      attr: CognitoUserAttribute[],
      getCognitoUserAttribute: (attributeName: string) => string | void
    } | void>((resolve) => {
      cognitoUser || resolve();

      cognitoUser?.getSession((error?: Error) => {
        error && resolve();

        cognitoUser.getUserAttributes((error, result) => {
          error ? resolve() :
            !result ? resolve() :
              resolve({
                attr: result,
                getCognitoUserAttribute: (attributeName: string) => this.getCognitoUserAttribute(result, attributeName)
              });
        });
      })
    });
  }
}

export default AWSCognito;
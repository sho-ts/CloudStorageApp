import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

export type CognitoUserType = {
  attr: CognitoUserAttribute[],
  getCognitoUserAttribute: (attributeName: string) => string | null
}
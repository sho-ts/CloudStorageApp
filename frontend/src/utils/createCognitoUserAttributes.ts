import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

/** オブジェクトの配列からcognitoUserAttributeの配列を作成します */
const createCognitoUserAttributes = (attrs: { [key: string]: string | number }) => (
  Object.entries(attrs).map(([Name, Value]) => (
    new CognitoUserAttribute({ Name, Value: String(Value) })
  ))
);

export default createCognitoUserAttributes;
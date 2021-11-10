import { Injectable } from '@nestjs/common';
import aws = require('aws-sdk');

@Injectable()
export class UserService {
  cognitoIdentity: aws.CognitoIdentityServiceProvider;

  constructor() {
    this.cognitoIdentity = new aws.CognitoIdentityServiceProvider({
      region: ''
    })
  }

  async signup(username: string, password: string): Promise<boolean> {
    const params = {
      ClientId: '',
      Password: password,
      Username: username,
    }

    try {
      const data = await this.cognitoIdentity.signUp(params).promise();
      console.log(data);
      return true;
    } catch(e) {
      console.log(e);
      return false;
    }
  }

  signin(email: string, password: string) {

  }
}

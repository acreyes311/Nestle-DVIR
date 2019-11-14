import { Injectable } from '@angular/core';
import {
  AuthenticationDetails,
  CognitoAccessToken,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
  NodeCallback
} from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environment';

/**
 * An service provides login functionality interfacing with AWS Cognito.
 *
 * Reference: https://medium.com/@shamique/aws-cognito-service-in-ionic-b234f21c27ef
 * Reference: https://github.com/awslabs/aws-cognito-angular-quickstart
 */
@Injectable({
  providedIn: 'root'
})
export class CognitoService {


  constructor() {
  }

  public static POOL_CONFIG: any = {
    UserPoolId: environment.cognitoUserPool,
    ClientId: environment.cognitoClientId
  };

  private static cognitoSession: CognitoUserSession;

  userPool: CognitoUserPool;

  /**
   * Authenticate the user based on the input username and password.
   *
   * @param username For now the username should be an email
   * @param password password for the user
   */
  authenticate(username, password) {
    return new Promise((resolved, reject) => {
      this.userPool = new CognitoUserPool(CognitoService.POOL_CONFIG);

      const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password
      });

      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: this.userPool
      });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: result => {
          CognitoService.cognitoSession = result;
          console.log(CognitoService.cognitoSession);
          resolved(result);
        },
        onFailure: err => {
          reject(err);
        },
        newPasswordRequired: userAttributes => {
          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.

          // the api doesn't accept this field back
          userAttributes.email = username;
          delete userAttributes.email_verified;

          cognitoUser.completeNewPasswordChallenge(password, userAttributes, {
            onSuccess: function(result) {},
            onFailure: function(error) {
              reject(error);
            }
          });
        }
      });
    });
  }

  access(jwtTokenConsumer: NodeCallback<string, void>) {
    // if (!this.cognitoSession.isValid()) {
    //   throw new Error('Outdated session');
    // }
    console.log(CognitoService.cognitoSession);
    if (CognitoService.cognitoSession.getAccessToken().getExpiration() > Date.now() / 1000 - 300) {
      this.refresh((err, result) => {
        jwtTokenConsumer(result.getAccessToken().getJwtToken());
      });
    }
    jwtTokenConsumer(CognitoService.cognitoSession.getAccessToken().getJwtToken());
  }

  refresh(callback) {
    this.userPool.getCurrentUser().refreshSession(CognitoService.cognitoSession.getRefreshToken(), callback);
  }
}

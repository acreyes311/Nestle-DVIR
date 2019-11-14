import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CognitoService } from './cognito.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

/**
 * login page will be the main home page for the web app, this is where drivers will be able to access their personal
 * accounts in order to submit DVIR forms
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  /**
   * The visual component that the username is typed into on the homepage
   */
  private name: FormControl;

  /**
   * The specific variable username which is an individual username given to each driver for access to the webapp
   */
  private _username: string;

  /**
   * THis is the username, login, and login button
   */
  private _loginGroup: FormGroup;

  /**
   * A message describing the login error.
   */
  private _loginFailedMessage: String;

  constructor(
    private storage: Storage,
    private cognito: CognitoService,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  /**
   * Returns a loading overlay for log in.
   */
  async presentLoading() {
    return await this.loadingController.create({
      message: 'Logging in...',
      duration: 5000
    });
  }

  /**
   * Reset the log in failed message when the user is about to enter a new user name or password.
   */
  resetLoginFailedMessage() {
    this._loginFailedMessage = '';
  }

  /**
   * The log in handler when use clicks the log in button.
   */
  async login() {
    const loading = this.presentLoading();
    await this.storage.set('name', this.name.value);
    this._username = this.name.value;
    await loading.then(v => {
      v.present();
    });
    this.cognito.authenticate(this._username, 'W_20001e')
      .then(
        i => {
          console.log(i);
          this.loadingController.dismiss();
          this.router.navigateByUrl('/new-trip');
        },
        e => {
          this.loadingController.dismiss();
          this._loginFailedMessage = e.message;
        });
  }

  ngOnInit() {
    this.storage.get('name').then(r => {
      this._username = r;
    });
    this.name = new FormControl(this._username, Validators.required);
    this._loginGroup = new FormGroup({
      name: this.name
    });
  }

  get loginFailedMessage(): String {
    return this._loginFailedMessage;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get loginGroup(): FormGroup {
    return this._loginGroup;
  }
}

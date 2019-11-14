import { Component } from '@angular/core';
import {Camera} from '@ionic-native/camera/ngx';
/**
 * Temporary page that is used for debugging
 * Has two buttons for login and Go To Form
 */

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {constructor(private camera: Camera) {}

}

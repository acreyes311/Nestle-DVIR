import { Component, OnInit } from '@angular/core';

/**
 * Logout page: For now a simple page that confirms successfull DVIR submission
 * Option to redirect back to home .
 */
@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

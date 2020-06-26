import { Component } from '@angular/core';
import { Auth2Service } from './services/auth2.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wePay';
  public userStatus;
  constructor(private auth: Auth2Service){
    this.userStatus = this.auth.userStatus;
    console.log('el primero', this.userStatus);
  }
}

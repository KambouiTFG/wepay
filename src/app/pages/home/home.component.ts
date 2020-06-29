import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
// import { Auth2Service } from 'src/app/services/auth2.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  constructor(private auth: AuthService) { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}

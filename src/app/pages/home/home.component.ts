import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Auth2Service } from 'src/app/services/auth2.service';
import { Subscription } from 'rxjs';
import { SalaService } from '../../services/sala.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  constructor(private _sala: SalaService) { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  prueba() {
    //this._sala.crearSala('primera sala', 'qwerty');
  }

  prueba2() {
        //this._sala.borrarAdmin('lQXAuqWrlRKJcIJn6RvO', 'qwerty');

  }
}

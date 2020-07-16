import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SalaService } from 'src/app/services/sala.service';
import { Subscription } from 'rxjs';
import { SalaModel } from '../../models/sala.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-body-sala',
  templateUrl: './body-sala.component.html',
  styleUrls: ['./body-sala.component.css']
})
export class BodySalaComponent implements OnInit, OnDestroy {

  @Input() idSala;
  hayInfo;
  myUid: string;
  infoSala: SalaModel;
  subs1: Subscription;

  pp;

  constructor(private _sala: SalaService, private _us: UserService) {
    this.hayInfo = false;
    this.myUid = this._us.myUid;
  }
  ngOnDestroy(): void {
    this.subs1.unsubscribe();
  }

  ngOnInit() {
    console.log('body sala', this.idSala);
    this.subs1 = this._sala.getSala(this.idSala).subscribe((resp: SalaModel) => {
      this.infoSala = resp;
      console.log('info de la sala: ', this.infoSala);
      this.hayInfo = true;
      this.isAdmin(this.myUid);
    });

    
  }
  isAdmin(id: string): boolean {
    if ( this.infoSala.admins.find(c => c === id)) {
      return true;
    } else {
      return false;
    }
  }

  prueba() {
    /* this._sala.codeSala('sb3daw').then( r => {
      console.log('then ', r);
    }).catch( e => {
      console.log(e);
    }); */



    //console.log(this._sala.codeSala('sb3daw'));
  }


  config() {

  }

  abandonarSala() {

  }

}

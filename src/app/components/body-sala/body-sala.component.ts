import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SalaService } from 'src/app/services/sala.service';
import { Subscription } from 'rxjs';
import { SalaModel } from '../../models/sala.model';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

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
  divConfig = false;

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
    if (id === this.infoSala.owner) {
      return true;
    } else if ( this.infoSala.admins.find(c => c === id)) {
      return true;
    } else {
      return false;
    }
  }


  rolSala(id: string) {
    if (id === this.infoSala.owner) {
      return '1';
    } else if ( this.infoSala.admins.find(c => c === id)) {
      return '2';
    } else {
      return '0';
    }
  }

  /* codigoSala(code: boolean) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cambiado estado...'
    });
    Swal.showLoading();
    setTimeout(() => {
      this._sala.estadoCode(this.idSala, code).then( () => {
        Swal.close();
      }).catch( e => {
        Swal.fire({
          title: 'Falló la operación',
          icon: 'warning',
          text: e
        });
      });
    } , 300);
  } */


  config() {
    this.divConfig = !this.divConfig;
  }

  /* borrarSala() {

  } */

  abandonarSala() {
    Swal.fire({
      title: `Seguro que quiere abandonar la sala ${this.infoSala.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, estoy seguro'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          text: 'abandonando sala...'
        });
        Swal.showLoading();
        this._sala.quitarUserSala(this.idSala, this.myUid, this.infoSala.productos).then( () => {
          setTimeout(() => {
            Swal.close();
          }, 800);
        });
      }
    });
  }


}

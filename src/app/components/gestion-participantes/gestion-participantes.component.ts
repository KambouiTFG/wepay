import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SalaService } from '../../services/sala.service';
import Swal from 'sweetalert2';
import { SalaModel } from '../../models/sala.model';

@Component({
  selector: 'app-gestion-participantes',
  templateUrl: './gestion-participantes.component.html',
  styleUrls: ['./gestion-participantes.component.css']
})
export class GestionParticipantesComponent implements OnInit {

  @Input() idSala: string;
  infoSala: SalaModel;
  usuarios = [];
  hayInfo = false;

  constructor(private _us: UserService, private _sala: SalaService) { }

  ngOnInit() {

    this._sala.getSala(this.idSala).subscribe( (r: SalaModel) => {
      this.infoSala = r;
      this.hayInfo = true;
      this.usuarios = [];

      let i = 0;
      for( let usuario of this.infoSala.usuarios){
        if (i !== 0 ){
          this.usuarios.push(this._us.getNameByUID(usuario));
        }
        i++;
      }
    });
  }

  hacerAdmin(index) {
    this.swalFire('Añadiendo admin...');
    this._sala.añadirAdmin(this.idSala, this.infoSala.usuarios[index + 1]).then( () => {
      this.swalClose();
    }).catch( e => {
      this.swalError(e);
    });
  }

  quitarAdmin(index) {
    this.swalFire('Quitando admin...');
    this._sala.quitarAdmin(this.idSala, this.infoSala.usuarios[index + 1]).then( () => {
      this.swalClose();
    }).catch( e => {
      this.swalError(e);
    });
  }

  esAdmin(i) {
    if ( this.infoSala.admins.find(c => c === this.infoSala.usuarios[i + 1])) {
      return true;
    } else {
      return false;
    }
  }

  eliminarUsuario(index) {
    this.swalFire('Eliminando usuario...');
    console.log('usuario a borrar: ', this.infoSala.usuarios[index + 1]);
    this._sala.quitarUserSala(this.idSala, this.infoSala.usuarios[index + 1]).then( () => {
      this.swalClose();
    }).catch( e => {
      this.swalError(e);
    });
  }

  private swalFire(accion: string) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: `${accion}`
    });
    Swal.showLoading();
  }

  private swalClose() {
    setTimeout( () => {
      Swal.close();
    }, 300);
  }

  private swalError(error: any) {
    Swal.fire({
      title: 'Falló la operación',
      icon: 'warning',
      text: error
    });
  }

}

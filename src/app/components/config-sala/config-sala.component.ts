import { Component, OnInit, Input } from '@angular/core';
import { SalaModel } from '../../models/sala.model';
import Swal from 'sweetalert2';
import { SalaService } from '../../services/sala.service';

@Component({
  selector: 'app-config-sala',
  templateUrl: './config-sala.component.html',
  styleUrls: ['./config-sala.component.css']
})
export class ConfigSalaComponent implements OnInit {

  @Input() infoSala: SalaModel;
  @Input() idSala: string;
  cambioNombre: boolean;
  nombre: string;

  constructor(private _sala: SalaService) {
    this.cambioNombre = false;
  }

  ngOnInit() {
    this.nombre = this.infoSala.nombre;
  }

  cambiarNombre(d?: boolean) {
    this.cambioNombre = !this.cambioNombre;
    if (d === undefined) {
      return;
    } else if (!d) {
      this.nombre = this.infoSala.nombre;
    } else if (d) {
      this.nombre = this.nombre.trim();
      if (this.nombre.length <= 4 ) {
        this.nombre = this.infoSala.nombre;
        this.swalError('El nombre debe de ser de al menos 4 caracteres');
        return;
      } else if ( this.nombre === this.infoSala.nombre ) {
        this.nombre = this.infoSala.nombre;
        return;
      }
      console.log('cambiando nombre');
      this.swalFire('nombre');
      this._sala.cambiarNombreSala(this.idSala, this.nombre).then( () => {
        this.swalClose();
      }).catch( e => {
        this.swalError(e);
      });
    }
  }

  codigoSala(code: boolean) {
    this.swalFire('estado');
    this._sala.estadoCode(this.idSala, code).then( () => {
      this.swalClose();
    }).catch( e => {
      this.swalError(e);
    });
  }

  borrarSala() {
    Swal.fire({
      title: `Seguro que quiere borrar la sala ${this.infoSala.nombre}`,
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
          text: 'Borrando sala...'
        });
        Swal.showLoading();

        this._sala.borrarSala(this.idSala, this.infoSala.usuarios)
        .then( () => {
          this.swalClose();
        }).catch( e => {
          this.swalError(e);
        });
      }
    });
  }

  isOwner() {
    return this._sala.esAdmin(this.infoSala.owner);
  }

  private swalFire(accion: string) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: `Cambiando ${accion}...`
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

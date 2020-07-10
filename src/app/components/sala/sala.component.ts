import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
import { SalaService } from '../../services/sala.service';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {
  loading = false;
  nombreSala = '';
  codigoSala = '';

  myInfo;

  sub1: Subscription;

  constructor(private _sala: SalaService,
              private _us: UserService) { }

  ngOnInit() {
    this.sub1 = this._us.getMyInfo().subscribe( resp => {
      this.myInfo = resp;
      console.log('mi info', this.myInfo);
      this.loading = true;
    })
  }

  crearSala(form: NgForm) {
    if (form.invalid) {
      console.log('invalido', form);
      return;
    }
    this.swalFireLoading('Creando');
    this._sala.crearSala(this.nombreSala).then(() => {
      this.swalFire('crear', true);
      form.resetForm();
    }).catch( (e: any) => {
      this.swalFire('crear', false, e);
    })
  }
  buscarSala(form: NgForm) {
    if (form.invalid) {
      console.log('invalido', form);
      return;
    }

    // To do
    this.swalFireLoading('Buscando');
    Swal.close();
    form.resetForm();
  }

  private swalFireLoading(accion: string) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: `${accion} sala ...`
    });
    Swal.showLoading();
  }

  private swalFire(accion: string, ok: boolean, msg?: string, ) {
    if (ok) {
      Swal.fire({
        title: `Exito al ${accion} sala.`,
        icon: 'success',
      });
    } else {
      Swal.fire({
        title: `Fallo al ${accion} sala.`,
        icon: 'error',
        text: msg
      });
    }
  }
}

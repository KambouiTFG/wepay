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
  sala: string;
  haySala: boolean;

  constructor(private _sala: SalaService,
              private _us: UserService) { }

  ngOnInit() {
    this.sub1 = this._us.getMyInfo().subscribe( resp => {
      this.myInfo = resp;
      console.log('mi info', this.myInfo);
      this.loading = true;
      this.haySala = false;
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


    this._sala.codeSala(this.codigoSala).then( (r: string) => {
      console.log('then ', r);
      this.swalFire('buscar', true, 'Sala añadida a la lista');
    }).catch( e => {
      console.log(e);
      this.swalFire('buscar', false, 'No se ha encontrado la sala');
    });
    //Swal.close();
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
        text: msg
      });
    } else {
      Swal.fire({
        title: `Fallo al ${accion} sala.`,
        icon: 'error',
        text: msg
      });
    }
  }

  salaEscogida(sala: string) {
    this.swalFireLoading('Entrando a');
    this.haySala = false;
    console.log('Sala actual: ', this.sala);
    console.log('Sala escogida: ', sala);
    setTimeout(() => {
      this.sala = sala;
      this.haySala = true;
      Swal.close();
    }, 300);
  }

  cerrarSala() {
    this.swalFireLoading('Cerrando');
    setTimeout(() => {
      this.haySala = false;
      Swal.close();
    }, 300);
  }
}

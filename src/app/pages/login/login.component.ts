import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UsuarioModel } from '../../models/usuario.model';

import { AuthService } from '../../services/auth.service';
// import { Auth2Service } from '../../services/auth2.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor( private auth: AuthService ) { }

  ngOnInit() {

    if ( localStorage.getItem('email') ) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }

  }
  login( form: NgForm ) {

    if (  form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();


    this.auth.login( this.usuario ).then((resp) => {
      Swal.close();
    }).catch( err => {
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: err.code
      });
    });
  }

  googleLogin(){

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();


    this.auth.googleLogin().then((resp) => {
      Swal.close();
      console.log('Google Login: ',resp);
    }).catch( err => {
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: err.code
      });
    });

  }

}



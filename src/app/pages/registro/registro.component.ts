import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Auth2Service } from 'src/app/services/auth2.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;
  constructor(private auth: AuthService) { }



  ngOnInit() {

    this.usuario = new UsuarioModel();
    console.log('usuario a registrar', this.usuario);
  }

  onSubmit( form: NgForm){

    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });

    Swal.showLoading();

    this.auth.register(this.usuario).then( (resp) => {
      Swal.close();
      console.log('respuesta ts: ', resp);
      }).catch( err => {
        console.log('ERROR', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al resgistrar',
          text: err
        });
      });
    }
  }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { UsuarioModel } from '../../models/usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {
  misDatosSub: Subscription;
  misDatos: UsuarioModel;
  loading = true;
  cambioNombre = false;
  puedeCambiar;

  constructor(private _us: UserService,
              private _auth: AuthService) {

   }
  

  ngOnInit() {
    this.misDatosSub = this._us.getUserByUID(this._auth.userStatus).subscribe((data: UsuarioModel) => {
      this.misDatos = data;
      console.log('Mis datos', this.misDatos);
      this.loading = false;
      this.puedeCambiar = this._us.compruebaFecha(this.misDatos.cambioNombre);
    });




  }

  

  ngOnDestroy(): void {
    this.unSubscribe();
  }

  unSubscribe() {
    this.misDatosSub.unsubscribe();

  }

  cambiarNombre(d: boolean, name?: string) {
    this.cambioNombre = !this.cambioNombre;
    if (!d || !this.puedeCambiar) {
      return;
    }
    console.log('cambiando nombre... ', name);
    name = name.trim();
    if (name !== this.misDatos.nombre) {
      const hoy = new Date();
      hoy.setDate(hoy.getDate() + 14);
      this.misDatos.cambioNombre = hoy.getTime();

      this.misDatos.nombre = name;
      this._us.nameChanger(this._auth.userStatus, this.misDatos);
    }
  }
}

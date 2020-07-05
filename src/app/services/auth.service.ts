import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { UsuarioModel } from 'src/app/models/usuario.model';


import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import 'firebase/auth';
// import { Observable } from 'rxjs';

//import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  //public usuario: UsuarioModel;
  public userStatus = null;
  public role = 0;

  constructor(private afs: AngularFirestore,
              public  afAuth: AngularFireAuth,
              private router: Router) {

    // UID del usuario con sesión activa
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        // console.log('Estado del usuario', user);
        this.userStatus = null;
      } else {
        this.userStatus = user.uid;
        console.log('Estado del usuario', user.uid, user);
        this.router.navigateByUrl('/home');
        this.getRoleByUID();

      }
    });
  }

  async googleLogin() {

    let errorP = {
      error: false,
      msg: '',
    };

    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then( (resp) => {
      // console.log('GOOGLE LOGIN RESP: ', resp);

      this.afs.collection('users').doc(resp.user.uid).get().forEach(data => {
        // console.log('[existe] hay datos');
        const userGoogle: UsuarioModel = {
          role: 2,
          email: resp.user.email,
          nombre: resp.user.displayName,
          google: true,
          img: resp.user.photoURL,
          creado: new Date().getTime(),
          cambioNombre: new Date().getTime()
        }
        if (!data.data()) {
          // CREAMOS EL USUARIO
          this.registarUser(userGoogle, resp.user.uid).catch( (e) => {
            errorP.error = true;
            errorP.msg = e;
          });
        } else {
          // Si existe usuario, cambiamos google = true
          if( !data.data().google ){
            // console.log('google esta a false, lo cambiamos ');
            delete userGoogle.nombre;
            this.afs.collection('users').doc(resp.user.uid).update(
              userGoogle
            ).catch((e) => {
              errorP.error = true;
              errorP.msg = e;
            });
          }
        }
      });
    }).catch( (e) => {
      errorP.error = true;
      errorP.msg = e;
    });
    return this.promesas(errorP);
  }


  async login(loginUser: UsuarioModel){
   return await this.afAuth.auth.signInWithEmailAndPassword(loginUser.email, loginUser.password);
  }


  async register( usuario: UsuarioModel) {

    let errorP = {
      error: false,
      msg: '',
    };

    await this.afAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
    .then( (resp) => {
      // Crear usuario tabla users
      //usuario.google = false; [Viene por defecto en el model Usuario]
      //usuario.img = 'none';

      this.registarUser(usuario, resp.user.uid).catch( (e) => {
        errorP.error = true;
        errorP.msg = e;
      });
    }).catch( (e) => {
      // console.log('salio mal dentro ', e);
      errorP.error = true;
      errorP.msg = e;
    });

    return this.promesas(errorP);
  }


  async logout() {
    this.userStatus = null;
    this.role = 0;
    await this.afAuth.auth.signOut();
  }

  private async registarUser( usuario: UsuarioModel, uid: string ){
    // console.log('Registrando usuario...');
    let nuevoUser: UsuarioModel;
    nuevoUser = {
      ...usuario
    };
    delete nuevoUser.password;
    await this.afs.collection('users').doc(uid).set(nuevoUser).then( () => {
      // console.log('### Usuario creado ####');
      // console.log(nuevoUser);
    }).catch( (err) => {
      // console.log('salio mal crear user ', err);
    });
  }

  promesas(errorP) {
    return new Promise((resolve, reject) => {
      if(!errorP.error){
        // console.log('exito promise');
        resolve('exito');
      } else {
        // console.log('error promise');
        reject(errorP.msg);
      }
    })
  }

  getRoleByUID(uid?: string) {
    // console.log('hay uid', uid);
    if (!uid) {
      uid = this.userStatus;
      // console.log('dame uid', uid);
    }
    this.afs.collection('users').doc(uid).get().forEach(data => {
      this.role = data.data().role;
    });
  }

  cargarUsuarios() {
    return this.afs.collection('users').valueChanges({ idField: 'propertyId'});

  }
}

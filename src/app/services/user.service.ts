import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario.model';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import FieldValue = firebase.firestore.FieldValue;


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public myUid: string;
  public nombre: string;
  
  usuarios;


  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.myUid = this.auth.userStatus;

    this.users.subscribe( r => {
      this.usuarios = r;
    });
  }

  private get users(): Observable<any> {
    return this.afs.collection('users').valueChanges({ idField: 'propertyId' });
  }

  nameChanger(uid: string, user: UsuarioModel) {
    this.afs.collection('users').doc(uid).update(
      user
    ).then( () => {
      console.log('éxito cambiando nombre');
    }).catch((e) => {
      console.log('error cambiando nombre: ', e);
    });
  }

  /* getUserByEmail(email) {
    const userr = this.users.pipe(map( users => users.find(user => user.email === email)));
    // console.log('Se obtiene: ', userr);
  } */

  getMyInfo() {
    return this.afs.collection('users').doc(this.myUid).valueChanges();

  }

  getUserByUID(uid: string) {
    return this.afs.collection('users').doc(uid).valueChanges();
  }


  compruebaFecha(lim: number): boolean {
    const hoy = new Date();
    const fechalim = new Date(lim);
    if (hoy > fechalim) {
      return true;
    } else {
      return false;
    }
  }

  añadirSalaUser(uid: string, uidSala: string) {
    this.afs.collection('users').doc(uid).update({
      'salas' : FieldValue.arrayUnion(uidSala)
    }).then( () => {
      console.log('Sala añadida al usuario');
    }).catch( e => {
      console.log('puta hay un fallo', e);
      const error = {
        error: true,
        msg: e
      };
      return this.promesas(error);
    });
    return this.promesas(null);
  }

  borrarSalaUser(uid: string, uidSala: string) {
    this.afs.collection('users').doc(uid).update({
      'salas' : FieldValue.arrayRemove(uidSala)
    }).then( () => {
      console.log('Sala borrada del usuario');
    }).catch( e => {
      console.log('puta hay un fallo', e);
      const error = {
        error: true,
        msg: e
      };
      return this.promesas(error);
    })

    return this.promesas(null);

  }

  getNameByUID(uid: string) {
    const uuser: UsuarioModel = this.usuarios.find(user => user.propertyId === uid);
    let infoUser = {
      nombre : uuser.nombre,
      img : uuser.img
    }
    return infoUser;
  }

  private promesas(error) {
    return new Promise((resolve, reject) => {
      if(error === null){
        // console.log('exito promise');
        resolve('exito');
      } else {
        // console.log('error promise');
        reject(error.msg);
      }
    })
  }
}

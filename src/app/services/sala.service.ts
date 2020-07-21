import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SalaModel } from '../models/sala.model';

import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import FieldValue = firebase.firestore.FieldValue;



@Injectable({
  providedIn: 'root'
})
export class SalaService {
  private uid: string;
  private listaSalas: SalaModel[];

  constructor(private afs: AngularFirestore,
              private auth: AuthService,
              private _us: UserService) {
    this.uid = this.auth.userStatus;
  }

 /*  private get salas(): Observable<any> {
    return this.afs.collection('salas').valueChanges({ idField: 'propertyId' });
  } */
// ----------------------------------------------------
  codeSala(code: string) {
    return new Promise( (resolve, reject) => {
      this.afs.collection('salas').ref.where('code', '==', code).where('open', '==', true)
      .onSnapshot(snap => {
        if ( snap.empty) {
          reject(null);
        }
        snap.forEach(r => {
          console.log('a ver q ', r.data());
          this.añadirUserSala(r.id, this.uid).then( () => {
            this._us.añadirSalaUser(this.uid, r.id).then( () => {
              resolve(r.id);
            }).catch( e => {
              reject(null);
            });
          }).catch(e => {
            reject(null);
          });
        });
      });
    });
  }
// ----------------------------------------------------
  crearSala(nom: string) {
    const sala: SalaModel = {
      nombre : nom,
      owner : this.uid,
      admins : [],
      usuarios : [this.uid],
      productos : [],
      img : '',
      code: Math.random().toString(36).substr(6, 9),
      open: true,
      creado : new Date().getTime()
    };
    console.log('izan', sala);
    this.afs.collection('salas').add(sala).then( (e) => {

      this._us.añadirSalaUser(this.uid, e.id).catch( (er) => {
        const error = {
          error: true,
          msg: er
        };
        return this.promesas(error);
      });

      console.log('Sala creada correctamente');
    }).catch( (e) => {
      console.log('Error al crear sala');
      const error = {
        error: true,
        msg: e
      };
      return this.promesas(error);
    });
    return this.promesas(null);
  }
// ----------------------------------------------------
  quitarAdmin(idSala: string, admin: string) {
    this.afs.collection('salas').doc(idSala).update({
      admins : FieldValue.arrayRemove(admin)
    }).then( () => {
      console.log('usuario borrado');
    }).catch( e => {
      console.log('puta hay un fallo', e);
    });
  }
// ----------------------------------------------------
  añadirAdmin(idSala: string, admin: string) {
    this.afs.collection('salas').doc(idSala).update({
      admins : FieldValue.arrayUnion(admin)
    }).then( () => {
      console.log('admin añadido');
    }).catch( e => {
      console.log('puta hay un fallo', e);
    });
  }
// ----------------------------------------------------
  getIndexSala(idSala: string) {
    let sala = {
      nombre: '',
      img: ''
    };
    this.afs.collection('salas').doc(idSala).get().forEach(data => {
      sala.nombre = data.data().nombre;
      sala.img = data.data().img;
    });
    return sala;
  }
// ----------------------------------------------------

  getSala(idSala: string) {
    return this.afs.collection('salas').doc(idSala).valueChanges();
  }
// ----------------------------------------------------

  añadirUserSala(idSala: string, idUser: string) {
    this.afs.collection('salas').doc(idSala).update({
      'usuarios' : FieldValue.arrayUnion(idUser)
    }).then( () => {
      console.log('usuario añadido a sala');
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

  // ----------------------------------------------------

  quitarUserSala(idSala: string, idUser: string) {
    this.afs.collection('salas').doc(idSala).update({
      'usuarios' : FieldValue.arrayRemove(idUser)
    }).then( () => {
      console.log('usuario eliminado de la sala');
      this._us.borrarSalaUser(idUser, idSala).then( () => {
        console.log('sala eliminada del usuario');
      });
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
// ----------------------------------------------------
estadoCode(idSala: string, estado: boolean) {
  this.afs.collection('salas').doc(idSala).update({
    open : estado
  }).then( () => {
    console.log('estado de sala cambiado');
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

// ----------------------------------------------------
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

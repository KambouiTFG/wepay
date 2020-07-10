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

  constructor(private afs: AngularFirestore,
              private auth: AuthService,
              private _us: UserService) {
    this.uid = this.auth.userStatus;
  }


  crearSala(nom: string) {
    const sala: SalaModel = {
      nombre : nom,
      admins : [this.uid],
      usuarios : [this.uid],
      productos : [],
      img : '',
      code: '',
      creado : new Date().getTime()
    }
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

  quitarAdmin(idSala: string, admin: string) {
    this.afs.collection('salas').doc(idSala).update({
      admins : FieldValue.arrayRemove(admin)
    }).then( () => {
      console.log('usuario borrado');
    }).catch( e => {
      console.log('puta hay un fallo', e);
    })
  }

  añadirAdmin(idSala: string, admin: string) {
    this.afs.collection('salas').doc(idSala).update({
      admins : FieldValue.arrayUnion(admin)
    }).then( () => {
      console.log('admin añadido');
    }).catch( e => {
      console.log('puta hay un fallo', e);
    })
  }

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

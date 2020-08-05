import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SalaModel } from '../models/sala.model';

import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import FieldValue = firebase.firestore.FieldValue;
import { identity } from 'rxjs';



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
  /* codeSala(code: string) {
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
  } */

  codeSala(code: string) { //idField: 'propertyId' 
    return new Promise( (resolve, reject) => {
      this.afs.collection('salas').ref.where('code', '==', code).where('open', '==', true)
      .get().then( (r) => {
        r.forEach( (rr) => {
          resolve(rr.data());
          this.añadirUserSala(rr.id, this.uid).then( () => {
            this._us.añadirSalaUser(this.uid, rr.id).then( () => {
              resolve(rr.id);
              return this.promesas2(rr.id);
            }).catch( e => {
              reject(null);
            });
          }).catch(e => {
            reject(null);
          });
          /* console.log('rr1: ', rr.id);
          console.log('rr2: ', rr.data()); */
        });
        reject(null);
      });
    });

    /* .onSnapshot(snap => {
      if ( snap.empty) {
        return this.promesas2(null);
      }
      snap.forEach(r => {
        console.log('a ver q ', r.data());
        this.añadirUserSala(r.id, this.uid).then( () => {
          this._us.añadirSalaUser(this.uid, r.id).then( () => {
            //resolve(r.id);
            return this.promesas2(r.id);
          }).catch( e => {
            //reject(null);
            return this.promesas2(null);
          });
        }).catch(e => {
          //reject(null);
          return this.promesas2(null);
        });
      });
    }); */
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
      const error = {
        error: true,
        msg: e
      };
      return this.promesas(error);
    });
    return this.promesas(null);
  }
// ----------------------------------------------------
  añadirAdmin(idSala: string, admin: string) {
    this.afs.collection('salas').doc(idSala).update({
      admins : FieldValue.arrayUnion(admin)
    }).then( () => {
      console.log('admin añadido');
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

 /*  quitarUserSala(idSala: string, idUser: string) {
    this._us.borrarSalaUser(idUser, idSala).then( () => {
      console.log('vamos a borrar el usuario de la sala');
      setTimeout(() => {
        this.afs.collection('salas').doc(idSala).update({
          admins : FieldValue.arrayRemove(idUser),
          usuarios : FieldValue.arrayRemove(idUser)
        });
        console.log('[SALA] en el timeoout');
      }, 600);
      console.log('[SALA] despues del time');
    }).catch( e => {
      console.log('puta hay un fallo', e);
      const error = {
        error: true,
        msg: e
      };
      return this.promesas(error);
    });
    return this.promesas(null);
  } */

// arreglar esto

  quitarUserSala(idSala: string, idUser: string) {
    this._us.borrarSalaUser(idUser, idSala).then( () => {
      console.log('vamos a borrar el usuario de la sala');
      setTimeout(() => {
        this.afs.collection('salas').doc(idSala).update({
          admins : FieldValue.arrayRemove(idUser),
          usuarios : FieldValue.arrayRemove(idUser)
        });
        console.log('[SALA] en el timeoout');
      }, 600);
      console.log('[SALA] despues del time');
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
 cambiarNombreSala(idSala: string, nombre) {
   this.afs.collection('salas').doc(idSala).update({
     nombre
   }).then ( () => {
     console.log('nombre de sala cambiado');
   }).catch( e => {
    console.log('falló cambiar nombre', e);
    const error = {
      error: true,
      msg: e
    };
    return this.promesas(error);
   });
   return this.promesas(null);
 }

 // ----------------------------------------------------
 cambiarImgSala(idSala: string, img: string) {
  this.afs.collection('salas').doc(idSala).update({
    img
  }).then ( () => {
    console.log('imagen de sala cambiado');
  }).catch( e => {
   console.log('falló cambiar imagen', e);
   const error = {
     error: true,
     msg: e
   };
   return this.promesas(error);
  });
  return this.promesas(null);
}
// ----------------------------------------------------
esAdmin(idOwner: string) {
  if (this.uid === idOwner) {
    return true;
  } else {
    return false;
  }
}

// ----------------------------------------------------

borrarSala(idSala: string, usuarios: string[]) {
  for( let usuario of usuarios) {
    this._us.borrarSalaUser(usuario, idSala).then( () => {
      console.log('sala eliminada del usuario');
    });
  }
  this.afs.collection('salas').doc(idSala)
  .delete().catch( e => {
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
    });
  }

  private promesas2(resp) {
    return new Promise((resolve, reject) => {
      if (resp === null) {
        reject('fracaso');
      } else {
        resolve(resp);
      }
    });
  }
}

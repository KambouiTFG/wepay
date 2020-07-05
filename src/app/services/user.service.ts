import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioModel } from 'src/app/models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) { }

  public get users(): Observable<any> {
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

  getUserByEmail(email) {
    const userr = this.users.pipe(map( users => users.find(user => user.email === email)));
    // console.log('Se obtiene: ', userr);
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
}

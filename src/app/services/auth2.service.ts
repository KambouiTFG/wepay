import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';


import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Auth2Service {
  private usersCollection: AngularFirestoreCollection<any>;
  public usuario: UsuarioModel;
  public userStatus = null;

  public items: Observable<any[]>;



  constructor(private afs: AngularFirestore, public  afAuth: AngularFireAuth, private router: Router) { 

    // UID del usuario con sesión activa
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        console.log('Estado del usuario', user);
        this.userStatus = null;
      } else {
        this.userStatus = user.uid;
        console.log('Estado del usuario',user.uid, user);
        this.router.navigateByUrl('/home');
      }
    });
  }

  public get users(): Observable<any> {
    return this.afs.collection('users').valueChanges({ idField: 'propertyId' });
  }

  getUserByEmail(email) {
    const userr = this.users.pipe(map( users => users.find(user => user.email === email)));
    console.log('Se obtiene: ', userr);
  }

  /* getUserByEmail(email): Observable<any>{
    return from(this.users.pipe(
      map(c => c.find(dato => dato.email == email)),
    ));
  } */






  async googleLogin() {
    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then( (resp) => {
      console.log('GOOGLE LOGIN RESP: ', resp);



      const userGoogle: UsuarioModel = {
        email: resp.user.email,
        nombre: resp.user.displayName,
        google: true,
        img: resp.user.photoURL,
      }

      this.registarUser(userGoogle, true, resp.user.uid).catch( (e) => {
        errorP.error = true;
        errorP.msg = e;
      });

      console.log('enviar al método', userGoogle);
      
    }).catch( (e) => {

    });

    let errorP = {
      error: false,
      msg: '',
    };

    return new Promise((resolve, reject) => {
      console.log('paso 1');
      if(!errorP.error){
        console.log('exito promise');
        resolve('exito');
      } else {
        console.log('error promise');
        reject(errorP.msg);
      }
    })
  }

   
  async login(loginUser: UsuarioModel){
   return await this.afAuth.auth.signInWithEmailAndPassword(loginUser.email, loginUser.password);
  }

   async register( usuario: UsuarioModel){
    let errorP = {
      error: false,
      msg: '',
    };

    await this.afAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.password).then( (resp)=> {
      console.log('salio bien dentro ', resp);
      // Crear usuario tabla users
      console.log('llamamos al metodo');
      usuario.google = false;
      usuario.img = 'none';
      this.registarUser(usuario, false, resp.user.uid).catch( (e) => {
        errorP.error = true;
        errorP.msg = e;
      });
      console.log('salio del metodo');

      /* let nuevoUser = {
        nombre: usuario.nombre,
        email: usuario.email,
        uid: resp.user.uid
      }
      console.log('Usuario a crear: ', nuevoUser);

      this.afs.collection('users').add(nuevoUser).then( resp => {
        console.log('### Usuario creado ####');
        console.log('nuevo usuario: ', nuevoUser, resp );

      }).catch( (err) => {
        console.log('salio mal crear user ', err);
        errorP.error = true;
        errorP.msg = err;
      }); */

    }).catch( (e) => {
      console.log('salio mal dentro ', e);
      errorP.error = true;
      errorP.msg = e;
    });

    console.log('cojone', errorP);
    return new Promise((resolve, reject) => {
      console.log('paso 1');
      if(!errorP.error){
        console.log('exito promise');
        resolve('exito');
      } else {
        console.log('error promise');
        reject(errorP.msg);
      }
    })
  }

  async logout() {
    this.userStatus = null;
    await this.afAuth.auth.signOut();
  }

  private async registarUser( usuario: UsuarioModel, google: boolean, uid: string ){
    console.log('estamos en el metodo');
    let nuevoUser: UsuarioModel;

    nuevoUser = {
      ...usuario
    };
    delete nuevoUser.password;

    console.log('llamamos');
    //await this.afs.collection('users').add(nuevoUser).
    await this.afs.collection('users').doc(uid).set(nuevoUser).then( resp => {
      console.log('### Usuario creado ####');
      console.log('nuevo usuario: ', nuevoUser, resp );
    }).catch( (err) => {
      console.log('salio mal crear user ', err);
    });
    console.log('AAAAA');
  }


  cargarUsuarios(){
    return this.items = this.afs.collection('users').valueChanges({ idField: 'propertyId'});

  }

  existe(){
    // Create a reference to the cities collection

// Create a query against the collection
    /* var query = citiesRef.ref.where('email', '==', 'amin@amin.es')
    .get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
          console.log(doc.id, ' => ', doc.data());
      });
  }); */

    this.afs.collection('users').ref.where('google','==', false)
      .onSnapshot( snap => {
        snap.forEach(data => {
          console.log('datos: ', data.data());
        });
      });
  }


  
  
}

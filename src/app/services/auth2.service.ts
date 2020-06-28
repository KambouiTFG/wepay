import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


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
  public usuario: UsuarioModel;
  public userStatus = null;

  constructor(private afs: AngularFirestore,
              public  afAuth: AngularFireAuth,
              private router: Router) {

    // UID del usuario con sesión activa
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        console.log('Estado del usuario', user);
        this.userStatus = null;
      } else {
        this.userStatus = user.uid;
        console.log('Estado del usuario', user.uid, user);
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

    let errorP = {
      error: false,
      msg: '',
    };

    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then( (resp) => {
      console.log('GOOGLE LOGIN RESP: ', resp);
      


      this.afs.collection('users').doc(resp.user.uid).get().forEach(data => {
        console.log('[existe] hay datos');
        const userGoogle: UsuarioModel = {
          email: resp.user.email,
          nombre: resp.user.displayName,
          google: true,
          img: resp.user.photoURL,
        }
        
        if (!data.data()) {
          console.log('estamos false en e if');

          // CREAMOS EL USUARIO

          
          this.registarUser(userGoogle, resp.user.uid).catch( (e) => {
            errorP.error = true;
            errorP.msg = e;
          });
          
          console.log('enviar al método', userGoogle);

        } else {

          console.log('estamos true en e if');
          if( data.data().google ){
            console.log('google esta a true, no hacemos nada');

          } else {
            console.log('google esta a false, lo cambiamos ');
            delete userGoogle.nombre;
            this.afs.collection('users').doc(resp.user.uid).update(
              /* google: true,
              img: userGoogle.img */
              userGoogle
            ).then(() => {
              console.log('exito');
            }).catch((e) => {
              console.log('fracaso');
            })

          }


        }
      });
      /*const userGoogle: UsuarioModel = {
        email: resp.user.email,
        nombre: resp.user.displayName,
        google: true,
        img: resp.user.photoURL,
      }
      this.existe(resp.user.uid)
      this.registarUser(userGoogle, true, resp.user.uid).catch( (e) => {
        errorP.error = true;
        errorP.msg = e;
      });
      console.log('enviar al método', userGoogle); */
    }).catch( (e) => {
      errorP.error = true;
      errorP.msg = e;
    });

    /* let errorP = {
      error: false,
      msg: '',
    }; */

    return this.promesas(errorP);

    /* return new Promise((resolve, reject) => {
      if(!errorP.error){
        console.log('exito promise');
        resolve('exito');
      } else {
        console.log('error promise');
        reject(errorP.msg);
      }
    }) */
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
      usuario.google = false;
      usuario.img = 'none';
      this.registarUser(usuario, resp.user.uid).catch( (e) => {
        errorP.error = true;
        errorP.msg = e;
      });

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

    return this.promesas(errorP);

    /* return new Promise((resolve, reject) => {
      if(!errorP.error){
        console.log('exito promise');
        resolve('exito');
      } else {
        console.log('error promise');
        reject(errorP.msg);
      }
    }) */
  }

  promesas(errorP) {
    return new Promise((resolve, reject) => {
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

  private async registarUser( usuario: UsuarioModel, uid: string ){
    console.log('Registrando usuario...');
    let nuevoUser: UsuarioModel;

    nuevoUser = {
      ...usuario
    };
    delete nuevoUser.password;

    await this.afs.collection('users').doc(uid).set(nuevoUser).then( () => {
      console.log('### Usuario creado ####');
      console.log(nuevoUser);
    }).catch( (err) => {
      console.log('salio mal crear user ', err);
    });
  }
  
  cargarUsuarios(){
    return this.afs.collection('users').valueChanges({ idField: 'propertyId'});

  }
}

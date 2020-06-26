import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';


import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth2Service {
  private itemsCollection: AngularFirestoreCollection<any>;
  public usuario: any = {};
  public userStatus = null;



  constructor(private afs: AngularFirestore, public  afAuth: AngularFireAuth, private router: Router) { 

    this.afAuth.authState.subscribe(user => {
      if (!user) {
        console.log('Estado del usuario', user);
        this.userStatus = null;
      } else {
        this.userStatus = user.uid;
        console.log(this.userStatus);
        console.log('------------------------------------------');
        console.log('Estado del usuario', user);
        this.router.navigateByUrl('/home');
      }
    });
  }




  async login(s: string) {
    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

   
  async login2(email, password){
   return await this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

   async register(email, password){
    let errorP = {
      error: false,
      msg: '',
    };

    await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then( (resp)=> {
      console.log('salio bien dentro ', resp);
    }).catch( (e) => {
      console.log('salio mal dentro ', e);
      errorP.error = true;
      errorP.msg = e;
    })

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
  
}

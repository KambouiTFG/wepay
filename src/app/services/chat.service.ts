import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Mensaje } from '../models/mensaje.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor(private afs: AngularFirestore, private auth: AuthService) { }

  agregarMensaje( texto: string, idSala: string) {
    const mensaje: Mensaje = {
      mensaje: texto,
      uid: this.auth.userStatus,
      fecha: new Date().getTime()
    };
    console.log('nuevo mensaje: ', mensaje);
    return this.afs.collection('chats').doc(idSala).collection('mensajes').add(mensaje);
  }

  cargarMensajes(idSala: string) {
    return this.afs.collection('chats').doc(idSala)
    .collection<Mensaje>('mensajes', ref => ref.orderBy('fecha', 'desc').limit(100)).valueChanges();
  }
}

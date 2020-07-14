import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Mensaje } from '../../models/mensaje.model';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  @Input() idSala;
  subs1: Subscription;
  chats: Mensaje[];
  mensaje: string;
  elemento: any;
  input: any;

  constructor(private _chat: ChatService,
              private _us: UserService) { }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
    document.getElementById('mensaje').focus();

    this.subs1 = this._chat.cargarMensajes(this.idSala).subscribe( r => {
      setTimeout ( () => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);
      this.chats = r;
      // console.log('Chat del grupo: ', this.chats);
    });
  }

  ngOnDestroy() {
    this.subs1.unsubscribe();
  }

  enviarMensaje() {
    if (this.mensaje.length === 0 ) {
      return;
    }
    this._chat.agregarMensaje( this.mensaje, this.idSala).then(() => {
      console.log('se añadio el mensaje');
      this.mensaje = '';
    }).catch(e => {
      console.log('error', e);
    });
  }

  nombreUser(uid: string) {
    return this._us.getNameByUID(uid)  ;
  }
}

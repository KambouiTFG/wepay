import { Component, OnInit, Input } from '@angular/core';
import { Mensaje } from '../../models/mensaje.model';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() idSala;
  mensaje: Mensaje;

  constructor(private _chat: ChatService) { }

  ngOnInit() {

  }

  prueba() {
    this._chat.agregarMensaje('prueba5', '12345678').then(() => {
      console.log('se añadio el mensaje');
    }).catch(e => {
      console.log('error');
    })
  }

  prueba2() {
    this._chat.cargarMensajes('12345678').subscribe( r => {
      console.log('a ver q trae: ', r);
    });
  }

}

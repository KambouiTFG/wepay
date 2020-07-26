import { Component, OnInit, Input } from '@angular/core';
import { CargaImagenService } from '../../services/carga-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carga-imagen',
  templateUrl: './carga-imagen.component.html',
  styleUrls: ['./carga-imagen.component.css']
})
export class CargaImagenComponent implements OnInit {
  @Input() idSala: string;

  archivo: File;
  hayArchivo: boolean;
  estaSubiendo: boolean;
  subido: boolean;
  puede: boolean;


  constructor(private _storage: CargaImagenService) { }

  ngOnInit() {
    this.hayArchivo = false;
    this.estaSubiendo = false;
    this.subido = false;
    this.puede = true;
  }

  uploadFile(event) {
    if ( event.target.files[0] === undefined ) {
      this.hayArchivo = false;
      this.estaSubiendo = false;
      this.subido = false;
      return;
    }
    this.archivo = event.target.files[0];
    if ( this.archivo.size > 1048576 || this.archivo.type.indexOf('image/') < 0 ) {
      this.puede = false;
    } else {
      this.puede = true;
    }
    this.estaSubiendo = false;
    this.subido = false;
    this.hayArchivo = true;
  }

  subirImagen() {
    this.estaSubiendo = true;
    this._storage.subirImagenSala(this.archivo, this.idSala).then(() => {
        this.subido = true;
    }).catch( e => {
      this.hayArchivo = false;
      this.estaSubiendo = false;
      this.subido = false;
      Swal.fire({
        title: 'Falló la operación',
        icon: 'warning',
        text: e
      });
    });
  }
}

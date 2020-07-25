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


  constructor(private _storage: CargaImagenService) { }

  ngOnInit() {
    this.hayArchivo = false;
    this.estaSubiendo = false;
    this.subido = false;
  }

  uploadFile(event) {
    if ( event.target.files[0] === undefined ) {
      this.hayArchivo = false;
      this.estaSubiendo = false;
      this.subido = false;
      return;
    } else if(event.target.files[0] !== this.archivo) {
      this.hayArchivo = false;
      this.estaSubiendo = false;
      this.subido = false;
    }
    this.archivo = event.target.files[0];
    this.estaSubiendo = false;
    this.subido = false;
    this.hayArchivo = true;
    console.log('archivo: ', this.archivo);
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

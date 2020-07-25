import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { SalaService } from './sala.service';


@Injectable({
  providedIn: 'root'
})
export class CargaImagenService {
  private USER = 'user';
  private SALA = 'salas';
  private PRODUCT = 'product';

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  
  constructor(private _storage: AngularFireStorage, private _sala: SalaService) { }

  subirImagenSala(img: File, idSala: string) {

    const filePath = `${this.SALA}/${idSala}`;
    const fileRef = this._storage.ref(filePath);
    const task = this._storage.upload(filePath, img);

    this.uploadPercent = task.percentageChanges();

    task.then( () => {
      this.downloadURL = fileRef.getDownloadURL();
      console.log('imagen subida: ');
      this.downloadURL.forEach( e => {
        this._sala.cambiarImgSala(idSala, e);
      });
    }).catch( e => {
      console.log('error', e);
      return this.promesas(e);
    });
    return this.promesas(null);

  }

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
}

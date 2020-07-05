import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductoModel } from '../models/producto.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  

  constructor( private afs: AngularFirestore ) { }

  public get products(): Observable<any> {
    return this.afs.collection('products').valueChanges({ idField: 'propertyId' });
  }


  añadirProducto(newProduct: ProductoModel) {
    const product = { ...newProduct };

    this.afs.collection('products').add(product).catch( e => {
      const error = {
        state: true,
        msg: e
      };
      return this.promesas(error);
    });

    return this.promesas(null);

  }

  borrarProducto(id: string) {
    this.afs.collection('products').doc(id).delete().catch( e => {
      let error = {
        status: true,
        msg: e
      };
      return this.promesas(error);
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
    })
  }
}

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


  dbProducto(newProduct: ProductoModel, id: string) {
    const product = { ...newProduct };

    if (id === 'nuevo') {
      return this.añadirProducto(product);
    } else {
      return this.actualizarProducto(product, id);
    }

   /*  this.afs.collection('products').add(product).catch( e => {
      const error = {
        state: true,
        msg: e
      };
      return this.promesas(error);
    });

    return this.promesas(null); */

  }

  private añadirProducto(product) {
    this.afs.collection('products').add(product).catch( e => {
      const error = {
        state: true,
        msg: e
      };
      return this.promesas(error);
    });
    return this.promesas(null);
  }


  private actualizarProducto(updProduct: ProductoModel, id: string) {
    const product = { ...updProduct };

    this.afs.collection('products').doc(id).update(updProduct).catch( e => {
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

  getProducto(id: string) {
    return this.afs.collection('products').doc(id).valueChanges();
    /* .forEach(data => {
      p = {
        nombre: data.data().nombre,
        precio: data.data().precio,
        categoria: data.data().categoria,
        img: data.data().img,
        descripcion: data.data().descripcion
      }
    });
    console.log('que data hay akaaaaaa', p);
 
    return p;*/

    
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

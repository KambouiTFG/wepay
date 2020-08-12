import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductoModel } from '../models/producto.model';
import { ProductoSalaModel } from '../models/product-sala';
import { SalaService } from './sala.service';
import FieldValue = firebase.firestore.FieldValue;



@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  

  constructor( private afs: AngularFirestore, private _sala: SalaService ) { }

  /* public get products(): Observable<any> {
    return this.afs.collection('products').valueChanges({ idField: 'propertyId' });
  } */
  
  añadirProducto(idSala: string, producto: ProductoSalaModel) {
    const newP = {...producto};
    this.afs.collection('salas').doc(idSala).collection('productos')
    .add(newP).then( (r) => {
      //console.log('Producto añadido en sala, ', r.id);
      this._sala.añadirProductoSala(idSala, r.id);
    }).catch( e => {
      const error = {
        state: true,
        msg: e
      };
      return this.promesas(error);
    });
    return this.promesas(null);
  }

  getProductos(idSala: string) {
    return this.afs.collection('salas').doc(idSala).collection('productos')
    .valueChanges('idField: propertyId');
  }

  añadirUserTodosProductos(idsala: string, productos: string[], idUser: string) {
    productos.forEach(p => {
      this.afs.collection('salas').doc(idsala)
      .collection('productos').doc(p).update({
        participantes : FieldValue.arrayUnion(idUser)
      }).then( () => {
        console.log('usuario añadido al producto');
      }).catch( e => {
        console.log('falló la operación');
      });
    });
  }

  quitarUserTodosProductos(idsala: string, productos: string[], idUser: string) {
    productos.forEach(p => {
      this.afs.collection('salas').doc(idsala)
      .collection('productos').doc(p).update({
        participantes : FieldValue.arrayRemove(idUser)
      }).then( () => {
        console.log('usuario eliminado del producto');
      }).catch( e => {
        console.log('falló la operación');
      });
    });
  }


  añadirUserProducto(idsala: string, producto: string, idUser: string) {
    this.afs.collection('salas').doc(idsala)
    .collection('productos').doc(producto).update({
      participantes : FieldValue.arrayUnion(idUser)
    }).then( () => {
      console.log('usuario añadido al producto');
    }).catch( e => {
      console.log('falló la operación');
    });
  }

  quitarUserProducto(idsala: string, producto: string, idUser: string) {
    this.afs.collection('salas').doc(idsala)
    .collection('productos').doc(producto).update({
      participantes : FieldValue.arrayRemove(idUser)
    }).then( () => {
      console.log('usuario añadido al producto');
    }).catch( e => {
      console.log('falló la operación');
    });
  }










  dbProducto(newProduct: ProductoModel, id: string) {
    const product = { ...newProduct };

    if (id === 'nuevo') {
      return this.añadirProductoOTRO(product);
    } else {
      return this.actualizarProductoOTRO(product, id);
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

  private añadirProductoOTRO(product) {
    this.afs.collection('products').add(product).catch( e => {
      const error = {
        state: true,
        msg: e
      };
      return this.promesas(error);
    });
    return this.promesas(null);
  }


  private actualizarProductoOTRO(updProduct: ProductoModel, id: string) {
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

  borrarProductoOTRO(id: string) {
    this.afs.collection('products').doc(id).delete().catch( e => {
      let error = {
        status: true,
        msg: e
      };
      return this.promesas(error);
    });
    return this.promesas(null);
  }

  getProductoOTRO(id: string) {
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
    });
  }
}

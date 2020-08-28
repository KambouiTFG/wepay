import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductoModel } from '../models/producto.model';
import { ProductoSalaModel } from '../models/product-sala';

import * as firebase from 'firebase/app';
import FieldValue = firebase.firestore.FieldValue;



@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor(private afs: AngularFirestore/* ,
              private _sala: SalaService */ ) { }

  getProductos(idSala: string) {
    return this.afs.collection('salas').doc(idSala).collection('productos')
    .valueChanges({ idField: 'propertyId' });
  }
  /* public get products(): Observable<any> {
    return this.afs.collection('products').valueChanges({ idField: 'propertyId' });
  } */
  // hecho
  // Se añade producto en sala
  añadirProducto(idSala: string, producto: ProductoSalaModel) {
    const newP = {...producto};
    return this.afs.collection('salas').doc(idSala).collection('productos')
    .add(newP);
    /* .then( (r) => {
      //console.log('Producto añadido en sala, ', r.id);
      //this._sala.añadirProductoSala(idSala, r.id);
      return this.promesas2(r.id);
    }).catch( () => {
      return this.promesas2(null);
    }); */
    // return this.promesas(null);
  }
  // Hecho
  // Se quita producto de la sala
  quitarProducto(idSala: string, idProducto: string) {
    return this.afs.collection('salas').doc(idSala).collection('productos').doc(idProducto).delete();
  }
  // ===============================================
  // TO DO

  // Hecho
  // Cuando se une un nuevo usuario en sala
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
  // Hecho
  // Cuando un usuario abandona la sala o es echado
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


  // Usuario participa en un producto
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

  // Usuario deja de participar en un producto
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


  // Actualizar producto
  actualizarProducto(idSala: string, idProducto: string, producto: ProductoSalaModel) {
    this.afs.collection('salas').doc(idSala)
    .collection('productos').doc(idProducto).update(producto)
    .then( () => {
      console.log('añadido');
    })
    .catch( (e) => {
      const error = {
        state: true,
        msg: e
      };
      return this.promesas(error);
    });
    return this.promesas(null);
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

  private promesas2(id) {
    return new Promise((resolve, reject) => {
      if(id === null){
        // console.log('exito promise');
        reject('fracaso');
      } else {
        // console.log('error promise');
        resolve(id);
      }
    });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductoModel } from '../../models/producto.model';
import Swal from 'sweetalert2';

import { ProductoService } from '../../services/producto.service';


@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent implements OnInit {
  producto: ProductoModel;

  @Input() productoEdit: ProductoModel;

  constructor(private _ps: ProductoService) {
    
  }

  ngOnInit() {
    if (this.productoEdit === null) {
      this.producto = new ProductoModel();
    } else {
      this.producto = this.productoEdit;
    }
  }

  nuevoProducto(form: NgForm) {
    console.log(this.producto);
    if (form.invalid) {
      console.log('invalido ', this.producto);
      return;
    }
    console.log('valido ', this.producto);
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Añadiendo producto...'
    });
    Swal.showLoading();


    this._ps.añadirProducto(this.producto).then( () => {
      Swal.fire({
        icon: 'success',
        title: 'Producto añadido correctamente',
      });

    }).catch( (e) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al añadir producto',
        text: e
      });

    });


    form.resetForm();
    let x = new ProductoModel();
    this.producto = x;
    console.log(this.producto);

  }

}

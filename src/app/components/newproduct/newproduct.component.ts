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
  newProduct: boolean;

  @Input() productoEdit: ProductoModel;
  @Input() propertyId: string;

  constructor(private _ps: ProductoService) {
    
  }

  ngOnInit() {
    if (this.productoEdit === null) {
      this.producto = new ProductoModel();
      this.newProduct = true;
    } else {
      this.producto = this.productoEdit;
      this.newProduct = false;
    }
  }

  nuevoProducto(form: NgForm) {
    if (form.invalid) {
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Añadiendo producto...'
    });
    Swal.showLoading();

    this._ps.dbProducto(this.producto, this.propertyId).then( () => {
      Swal.fire({
        icon: 'success',
        title: 'Éxito'
      });

    }).catch( (e) => {
      Swal.fire({
        icon: 'error',
        text: e
      });

    });
    form.resetForm();
    let x = new ProductoModel();
    this.producto = x;
  }

}

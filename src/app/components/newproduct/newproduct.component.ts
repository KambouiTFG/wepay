import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

import { ProductoService } from '../../services/producto.service';
import { ProductoSalaModel } from '../../models/product-sala';
import { SalaModel } from '../../models/sala.model';

import $ from "jquery";



@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent implements OnInit {
  producto: ProductoSalaModel;

  @Input() idSala: string;
  @Input() infoSala: SalaModel;

  constructor(private _ps: ProductoService) {}

  ngOnInit() {
    this.producto = new ProductoSalaModel();
    console.log(this.producto);
    console.log(this.idSala);
  }

  nuevoProducto(form: NgForm) {
    console.log('probando: ', this.producto);
    if (form.invalid) {
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Añadiendo producto...'
    });
    Swal.showLoading();

    this.producto.participantes = this.infoSala.usuarios;
    this._ps.añadirProducto(this.idSala, this.producto).then( () => {
      Swal.fire({
        icon: 'success',
        title: 'Éxito'
      });
      $('#añadirProducto').hide();
      // $('#añadirProducto').modal('hidePrevented.bs.modal');
    }).catch( (e) => {
      Swal.fire({
        icon: 'error',
        text: e
      });

    });
    form.resetForm();
    /* let x = new ProductoSalaModel();
    this.producto = x; */
  }

}

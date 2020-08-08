import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

import { ProductoService } from '../../services/producto.service';
import { ProductoSalaModel } from '../../models/product-sala';
import { SalaModel } from '../../models/sala.model';

import $ from "jquery";
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent implements OnInit, OnDestroy {
  producto: ProductoSalaModel;

  @Input() idSala: string;
  @Input() infoSala: SalaModel;

  constructor(private _ps: ProductoService) {}
  ngOnDestroy(): void {
    console.log('adiooooos');
  }

  ngOnInit() {
    this.producto = new ProductoSalaModel();
  }

  nuevoProducto(form: NgForm) {
    if (form.invalid) {
      return;
    } else if (form.controls.precioProducto.value <= 0) {
      form.controls.precioProducto.setErrors({incorrect: true});
      return;
    } else if (form.controls.unidadProducto.value <= 0) {
      form.controls.unidadProducto.setErrors({incorrect: true});
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
        title: 'Producto añadido a la sala'
      });
    }).catch( (e) => {
      Swal.fire({
        icon: 'error',
        text: e
      });
    });
    this.producto = new ProductoSalaModel();
    form.resetForm();
    $('#cerrarModal').click();
  }
}

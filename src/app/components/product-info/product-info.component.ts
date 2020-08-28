import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductoService } from '../../services/producto.service';
import { ProductoSalaModel } from 'src/app/models/product-sala';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  @Input() producto;
  @Input() AllParticipantes;
  @Input() idSala;
  producto2: ProductoSalaModel;
  edit = false;

  constructor(private _us: UserService,
              private _p: ProductoService) { }

  cerrar() {
    this.producto2 = null;
    this.edit = false;
  }

  ngOnInit() {
  }


  getNombre(uid: string) {
    return this._us.getNameByUID(uid).nombre;
  }

  nuevoProducto(form: NgForm) {
    if (form.invalid) {
      return;
    } else if (form.controls.precioProducto2.value <= 0) {
      form.controls.precioProducto2.setErrors({incorrect: true});
      return;
    } else if (form.controls.unidadProducto2.value <= 0) {
      form.controls.unidadProducto2.setErrors({incorrect: true});
      return;
    } else if (this.producto2.participantes.length <= 0) {
      return;
    } else if (JSON.stringify(this.producto) === JSON.stringify(this.producto2)) {
      this.cerrar();
      return;
    }

    this.editarProducto(this.producto2);
    this.cerrar();
  }


  editar() {
    this.producto2 = {...this.producto};
    this.edit = true;
  }


  editarProducto(p) {

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Añadiendo producto...'
    });
    Swal.showLoading();
    this._p.actualizarProducto(this.idSala, p.propertyId, p).then( () => {
      Swal.fire({
        icon: 'success',
        title: 'Producto actualizado'
      });
    }).catch( (e) => {
      Swal.fire({
        icon: 'error',
        text: e
      });
    });
  }

  addPart(uid: string) {
    // this.producto2.participantes.unshift(uid);
  }

  quitarPart(uid: string) {
    // this.producto2.participantes.indexOf(uid);
    // eliminar
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductoService } from '../../services/producto.service';
import { ProductoSalaModel } from 'src/app/models/product-sala';
import * as $ from 'jquery';
import { SalaService } from '../../services/sala.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  @Input() producto;
  @Input() AllParticipantes;
  @Input() idSala;
  @Input() admin;
  producto2;
  edit = false;

  constructor(private _us: UserService,
              private _p: ProductoService,
              private _sala: SalaService) { }

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
    setTimeout(() => {
      $('#cerrarMod').click();
    }, 200);
    
  }


  editar() {
    if(! this.admin) {
      return;
    }
    this.producto2 = JSON.parse(JSON.stringify(this.producto));
    this.edit = true;
  }


  editarProducto(p) {

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Añadiendo producto...'
    });
    Swal.showLoading();
    const pid = p.propertyId;
    delete p.propertyId;
    this._p.actualizarProducto(this.idSala, pid, p).then( () => {
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
    //this.AllParticipantes.splice(this.AllParticipantes.indexOf(uid), 1);
    this.producto2.participantes.unshift(uid);
    
  }

  quitarPart(uid: string) {
    //this.AllParticipantes.unshift(uid);
    this.producto2.participantes.splice(this.producto2.participantes.indexOf(uid), 1);
  }

  borrar() {
    Swal.fire({
      title: `¿Seguro que quiere borrar el producto?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, estoy seguro'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          text: 'Borrando producto...'
        });
        Swal.showLoading();

        this._sala.quitarProductoSala(this.idSala, this.producto.propertyId)
        .then( () => {
          this.swalClose();
        }).catch( e => {
          this.swalError(e);
        });
      }
    });
  }

  private swalClose() {
    setTimeout( () => {
      Swal.close();
      $('#cerrarMod').click();
    }, 300);
  }

  private swalError(error: any) {
    Swal.fire({
      title: 'Falló la operación',
      icon: 'warning',
      text: error
    });
  }
}

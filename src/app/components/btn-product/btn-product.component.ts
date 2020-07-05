import { Component, OnInit, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductoModel } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-btn-product',
  templateUrl: './btn-product.component.html',
  styleUrls: ['./btn-product.component.css']
})
export class BtnProductComponent implements OnInit {

  @Input() id: string;
  @Input() producto: ProductoModel;

  constructor(private _ps: ProductoService) { }

  ngOnInit() {
  }

  borrar() {
    Swal.fire({
      title: `Confirma que quiere borrar ${this.producto.nombre}`,
      text: 'Es un borrado no reversible',
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
        this._ps.borrarProducto(this.id).then( () => {
          Swal.fire(
            'Producto borrado',
            '',
            'success'
          );
        });
      }
    });
  }

  editar() {
    
  }

}

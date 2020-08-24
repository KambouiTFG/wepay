import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  @Input() producto;
  @Input() AllParticipantes;
  producto2;
  edit = false;

  constructor(private _us: UserService) {
    
   }
  cerrar() {
    this.producto2 = null;
    this.edit = false;;
  }

  ngOnInit() {
  }


  getNombre(uid: string) {
    return this._us.getNameByUID(uid).nombre;
  }

  nuevoProducto(f: NgForm){

  }


  editar() {
    this.producto2 = {...this.producto};
    this.edit = true;
  }
}

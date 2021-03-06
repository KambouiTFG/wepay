import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SalaService } from '../../services/sala.service';
import { SalaModel } from '../../models/sala.model';
import { ProductoService } from '../../services/producto.service';
import { ProductoSalaModel } from 'src/app/models/product-sala';

@Component({
  selector: 'app-productos-sala',
  templateUrl: './productos-sala.component.html',
  styleUrls: ['./productos-sala.component.css']
})
export class ProductosSalaComponent implements OnInit, OnDestroy {

  @Input() idSala;
  @Input() infoSala: SalaModel;
  @Input() admin: boolean;
  subs1: Subscription;
  productos;
  hayInfo = false;
  total: number;
  miPart: number;


  infoProduct: ProductoSalaModel = null;

  constructor(private _sala: SalaService, private _ps: ProductoService) { }

  

  ngOnInit() {
    this.subs1 = this._ps.getProductos(this.idSala).subscribe( (r) => {
      this.productos = r;
      this.hayInfo = true;
      this.getTotal();
      this.miParticipacion();
    });
  }

  ngOnDestroy(): void {
    this.subs1.unsubscribe();
    this.hayInfo = false;
  }

  miParticipacion() {
    let monton = 0;
    this.productos.filter(p => p.participantes.includes(this._sala.uid))
    .forEach( p => {
      monton += (p.precio * p.unidad) / p.participantes.length;
    });
    this.miPart = monton;
  }

  gerParticipacion(idUser: string): number {
    let monton = 0;
    this.productos.filter(p => p.participantes.includes(idUser))
    .forEach( p => {
      monton += (p.precio * p.unidad) / p.participantes.length;
    });
    return monton;
  }

  infoProducto(p: ProductoSalaModel) {
    this.infoProduct = p;
  }


  private getTotal() {
    this.total = 0;
    this.productos.forEach( p => {
      if (p.participantes.length > 0) {
        this.total += p.precio * p.unidad;
      }
    });
  }

  



}

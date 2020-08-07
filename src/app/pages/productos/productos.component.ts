import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnDestroy {

  subs1: Subscription;
  allProducts;
  buscando: boolean;
  pTermino = '';
  categoria: number;
  listar = false;


  constructor(private router: Router,
              private _ps: ProductoService) {
    this.buscando = false;
    this.categoria = 5;
  }

  ngOnInit() {
    /* this.subs1 = this._ps.products.subscribe( r => {
      this.allProducts = r;
      this.listar = true;
      console.log('productos: ', r);
    }); */
  }

  ngOnDestroy(): void {
    this.subs1.unsubscribe();
    this.listar = false;
  }

  nuevoProducto() {
    this.router.navigate(['/producto', 'nuevo']);
  }

  buscar(termino: string) {
    if ( termino.trim().length === 0) {
      this.buscando = false;
    } else {
      this.pTermino = termino;
      this.buscando = true;
    }
  }

  prueba() {
    console.log(this.categoria);
  }
}
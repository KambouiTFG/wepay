import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ProductoModel } from '../../models/producto.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: any[];
  subs1: Subscription;

  constructor(private _ps: ProductoService) { }

  ngOnDestroy(): void {
    this.subs1.unsubscribe();
  }

  ngOnInit() {
    this.subs1 = this._ps.products.subscribe( r => {
      this.products = r;
      console.log('productos: ', r);
    })
  }

}

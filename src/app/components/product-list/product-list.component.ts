import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ProductoModel } from '../../models/producto.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit, OnDestroy {
  
  @Input() products;

  constructor(private _ps: ProductoService) { }

  ngOnDestroy(): void {
  }

  ngOnInit() {
    
  }

}

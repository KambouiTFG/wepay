import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductoModel } from 'src/app/models/producto.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit, OnDestroy {

  subs1: Subscription;
  subs2: Subscription;

  productoOut = null;
  id: string;
  isProduct = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private _ps: ProductoService) { }

  

  ngOnInit() {
    this.subs1 = this.route.params.subscribe( params => {
      this.id = params['id'];
    });
    if (this.id !== 'nuevo') {
      this.subs2 = this._ps.getProducto(this.id).subscribe((data) => {
        this.productoOut = data;
        this.isProduct = true;
      });
    } else {
      this.isProduct = true;
    }


  }

  ngOnDestroy(): void {
    this.subs1.unsubscribe();
    if (this.id !== 'nuevo') {
      this.subs2.unsubscribe();
    }

    this.isProduct = false;
  }

  backToProductList(){
    this.router.navigateByUrl('productos');
  }


}

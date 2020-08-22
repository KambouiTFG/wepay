import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  @Input() producto;

  constructor(private _us: UserService) { }

  ngOnInit() {
  }


  getNombre(uid: string){ 
    return this._us.getNameByUID(uid).nombre;
  }
}

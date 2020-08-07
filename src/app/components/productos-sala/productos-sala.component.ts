import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SalaService } from '../../services/sala.service';
import { SalaModel } from '../../models/sala.model';

@Component({
  selector: 'app-productos-sala',
  templateUrl: './productos-sala.component.html',
  styleUrls: ['./productos-sala.component.css']
})
export class ProductosSalaComponent implements OnInit, OnDestroy {

  @Input() idSala;
  @Input() infoSala: SalaModel;
  subs1: Subscription;
  hayInfo = false;

  constructor(private _sala: SalaService) { }

  

  ngOnInit() {

  }

  ngOnDestroy(): void {
    //this.subs1.unsubscribe();
    //this.hayInfo = false;
  }



}

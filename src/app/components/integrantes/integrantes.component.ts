import { Component, OnInit, Input } from '@angular/core';
import { SalaService } from '../../services/sala.service';

@Component({
  selector: 'app-integrantes',
  templateUrl: './integrantes.component.html',
  styleUrls: ['./integrantes.component.css']
})
export class IntegrantesComponent implements OnInit {

  @Input() idSala;
  infoSala;

  constructor(private _sala: SalaService ) {
    this._sala.getSala(this.idSala).subscribe( (r) => {
      this.infoSala = r;
    });
   }

  ngOnInit() {
  }

}

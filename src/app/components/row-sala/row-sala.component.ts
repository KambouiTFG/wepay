import { Component, OnInit, Input } from '@angular/core';
import { SalaService } from '../../services/sala.service';

@Component({
  selector: 'app-row-sala',
  templateUrl: './row-sala.component.html',
  styleUrls: ['./row-sala.component.css']
})
export class RowSalaComponent implements OnInit {
  @Input() idSala;
  infoSala;

  constructor(private _sala: SalaService) {

  }

  ngOnInit() {
    this.infoSala = this._sala.getIndexSala(this.idSala);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { SalaService } from 'src/app/services/sala.service';

@Component({
  selector: 'app-body-sala',
  templateUrl: './body-sala.component.html',
  styleUrls: ['./body-sala.component.css']
})
export class BodySalaComponent implements OnInit {

  @Input() idSala;
  hayInfo;
  infoSala;
  constructor(private _sala: SalaService) { 
    this.hayInfo = false;
  }

  ngOnInit() {
    console.log('body sala', this.idSala);
    this._sala.getSala(this.idSala).subscribe((resp) => {
      this.infoSala = resp;
      console.log('info de la sala: ', this.infoSala);
      this.hayInfo = true;
    });
  }

}

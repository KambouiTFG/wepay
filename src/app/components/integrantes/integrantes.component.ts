import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-integrantes',
  templateUrl: './integrantes.component.html',
  styleUrls: ['./integrantes.component.css']
})
export class IntegrantesComponent implements OnInit {

  @Input() idUser;
  @Input() rol;
  @Input() myUid;
  infoUser;

  constructor(private _us: UserService ) {
    
    /* this._sala.getSala(this.idSala).subscribe( (r) => {
      this.infoSala = r;
    }); */
   }

  ngOnInit() {
    this.infoUser = this._us.getNameByUID(this.idUser);
  }

}

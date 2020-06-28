import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
// import { Auth2Service } from 'src/app/services/auth2.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    
    this.sub1 = this.auth.cargarUsuarios().subscribe(data => {
      console.log('[HOME] usuarios: ', data);
    })
  }

  ngOnDestroy(){
    this.sub1.unsubscribe();
  }

  logout(){
    Swal.fire({
      allowOutsideClick: false,
      text: 'Hasta luego'
    });
    Swal.showLoading();

    this.sub1.unsubscribe();
    this.auth.logout();
    setTimeout( () => {
      location.reload();
      Swal.close();
    }, 800);

  }


}

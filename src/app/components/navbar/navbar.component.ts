import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit() {
  }

  logout() {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Hasta luego'
    });
    Swal.showLoading();
    this.route.navigateByUrl('/login');
    this.auth.logout();
    setTimeout( () => {
      location.reload();
      Swal.close();
    }, 300);
  }
}

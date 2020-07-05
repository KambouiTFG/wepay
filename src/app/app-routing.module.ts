import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

import { AuthGuard } from './guards/auth.guard';
import { SalaComponent } from './pages/sala/sala.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { AuthAdminGuard } from './guards/auth-admin.guard';



const routes: Routes = [
  { path: 'home'    , component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'me'    , component: PerfilComponent, canActivate: [ AuthGuard ] },
  { path: 'sala/:id'    , component: SalaComponent, canActivate: [ AuthGuard ] },
  { path: 'producto/:id'    , component: ProductosComponent, canActivate: [ AuthAdminGuard ] },
  { path: 'productos'    , component: ProductosComponent, canActivate: [ AuthAdminGuard ] },
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: '**', redirectTo: 'registro' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

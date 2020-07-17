import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

import { AuthGuard } from './guards/auth.guard';
import { ProductosComponent } from './pages/productos/productos.component';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { ProductoComponent } from './pages/producto/producto.component';



const routes: Routes = [
  { path: 'home'    , component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'me'    , component: PerfilComponent, canActivate: [ AuthGuard ] },
  { path: 'producto/:id'    , component: ProductoComponent/* ,  canActivate: [ AuthAdminGuard ] */  },
  { path: 'productos'    , component: ProductosComponent/* , canActivate: [ AuthAdminGuard ]  */},
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: '**', redirectTo: 'registro' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

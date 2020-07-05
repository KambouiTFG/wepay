// Módulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { NewproductComponent } from './components/newproduct/newproduct.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { BtnProductComponent } from './components/btn-product/btn-product.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SalaComponent } from './pages/sala/sala.component';


// Servicios
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

// Pipes
import { NoimagePipe } from './pipes/noimage.pipe';

// Otros
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistroComponent,
    NavbarComponent,
    PerfilComponent,
    SalaComponent,
    NoimagePipe,
    NewproductComponent,
    ProductListComponent,
    BtnProductComponent,
    ProductosComponent,
    ProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

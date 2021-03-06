// Módulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
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

// Servicios
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

// Pipes
import { NoimagePipe } from './pipes/noimage.pipe';

// Otros
import { environment } from '../environments/environment';
import { ProductsPipePipe } from './pipes/products-pipe.pipe';
import { PCatPipePipe } from './pipes/p-cat-pipe.pipe';
import { ProductoService } from './services/producto.service';
import { SalaService } from './services/sala.service';
import { SalaComponent } from './components/sala/sala.component';
import { RowSalaComponent } from './components/row-sala/row-sala.component';
import { BodySalaComponent } from './components/body-sala/body-sala.component';
import { ChatComponent } from './components/chat/chat.component';
import { IntegrantesComponent } from './components/integrantes/integrantes.component';
import { ConfigSalaComponent } from './components/config-sala/config-sala.component';
import { CargaImagenComponent } from './components/carga-imagen/carga-imagen.component';
import { GestionParticipantesComponent } from './components/gestion-participantes/gestion-participantes.component';
import { ProductosSalaComponent } from './components/productos-sala/productos-sala.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { ParticipantesPipe } from './pipes/participantes.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistroComponent,
    NavbarComponent,
    PerfilComponent,
    NoimagePipe,
    NewproductComponent,
    ProductListComponent,
    BtnProductComponent,
    ProductosComponent,
    ProductoComponent,
    ProductsPipePipe,
    PCatPipePipe,
    SalaComponent,
    RowSalaComponent,
    BodySalaComponent,
    ChatComponent,
    IntegrantesComponent,
    ConfigSalaComponent,
    CargaImagenComponent,
    GestionParticipantesComponent,
    ProductosSalaComponent,
    ProductInfoComponent,
    ParticipantesPipe
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    AuthService,
    UserService,
    ProductoService,
    SalaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

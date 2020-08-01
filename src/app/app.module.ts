import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegistrationService } from '../registration.service';
import { LoginCheckService } from 'src/login-check.service';
import { HotelRestoratntComponent } from './hotel-restoratnt/hotel-restoratnt.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TrainComponent } from './train/train.component';
import { BusComponent } from './bus/bus.component';
import { HotelComponent } from './hotel/hotel.component';
import { PlaneComponent } from './plane/plane.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { AvailableComponent } from './available/available.component';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'train', component: TrainComponent},
  { path: 'bus', component: BusComponent},
  { path: 'plane', component: PlaneComponent},
  { path: 'hotel', component: HotelComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'available/:data', component: AvailableComponent},
  { path: '**', component: HotelRestoratntComponent}
  ];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
   
    HotelRestoratntComponent,
    LoginComponent,
    TrainComponent,
    BusComponent,
    HotelComponent,
    PlaneComponent,
    ContactComponent,
    AdminComponent,
    AvailableComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ RegistrationService, LoginCheckService],
  bootstrap: [AppComponent]
})
export class AppModule { }

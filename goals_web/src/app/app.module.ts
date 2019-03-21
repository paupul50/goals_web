import { HomeComponent } from './shared/components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './shared/components/user/login/login.component';
import { CreateComponent } from './shared/components/user/create/create.component';
import { MaterialModule } from './shared/angular-material/angular-material.module';
import {SlideshowModule} from 'ng-simple-slideshow';
import { LoggedOutGuard } from './shared/guards/logged-out.guard';
import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { MomentModule } from 'ngx-moment';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    SlideshowModule,
    MomentModule
  ],
  providers: [
    LoggedOutGuard,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

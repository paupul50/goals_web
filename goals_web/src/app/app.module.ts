import { FooterComponent } from './shared/components/footer/footer.component';
import { CommentsComponent } from './shared/components/comments/comments.component';
import { HomeComponent } from './shared/components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './shared/components/user/login/login.component';
import { CreateComponent } from './shared/components/user/create/create.component';
import { MaterialModule } from './shared/angular-material/angular-material.module';
import {SlideshowModule} from 'ng-simple-slideshow';
import { LoggedOutGuard } from './shared/guards/logged-out.guard';
import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { MomentModule } from 'ngx-moment';
import { HttpConfigInterceptor } from './shared/services/interceptor/interceptor';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    CreateComponent,
    FooterComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SlideshowModule,
    MomentModule
  ],
  providers: [
    LoggedOutGuard,
    LoggedInGuard,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

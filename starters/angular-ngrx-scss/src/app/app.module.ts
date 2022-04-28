import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import ButtonComponent from './button-example/counter-button/button.component';
import { ButtonExampleComponent } from './button-example/button-example.component';
import { FetchExampleComponent } from './fetch-example/fetch-example.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, ButtonComponent, ButtonExampleComponent, FetchExampleComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

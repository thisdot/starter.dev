import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import ButtonComponent from './button-example/counter-button/button.component';
import { ButtonExampleComponent } from './button-example/button-example.component';
import { FetchExampleComponent } from './fetch-example/fetch-example.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './state/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { GreetingEffects } from './state/greeting/greeting.effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, ButtonComponent, ButtonExampleComponent, FetchExampleComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects, GreetingEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CounterExampleComponent } from './counter-example/counter-example.component';
import { FetchExampleComponent } from './fetch-example/fetch-example.component';
import { LoaderComponent } from './fetch-example/loader/loader.component';
import { GreetingEffects } from './state/greeting/greeting.effects';
import { HomeComponent } from './home/home.component';
import { StarterButtonComponent } from './counter-example/starter-button/starter-button.component';
import { environment } from '../environments/environment';
import { metaReducers, reducers } from './state/reducers';

@NgModule({
  declarations: [AppComponent, StarterButtonComponent, CounterExampleComponent, FetchExampleComponent, LoaderComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([GreetingEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

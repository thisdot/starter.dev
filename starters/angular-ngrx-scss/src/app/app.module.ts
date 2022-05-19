import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import ButtonComponent from './counter-example/counter-button/button.component';
import { CounterExampleComponent } from './counter-example/counter-example.component';
import { FetchExampleComponent } from './fetch-example/fetch-example.component';
import { HomeComponent } from './home/home.component';
import { GreetingEffects } from './state/greeting/greeting.effects';
import { metaReducers, reducers } from './state/reducers';

@NgModule({
  declarations: [AppComponent, ButtonComponent, CounterExampleComponent, FetchExampleComponent, HomeComponent],
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

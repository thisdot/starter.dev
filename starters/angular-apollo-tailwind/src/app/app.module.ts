import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FetchExampleComponent } from './fetch-example/fetch-example.component';
import { CounterComponent } from './counter/counter.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [AppComponent, FetchExampleComponent, CounterComponent],
    imports: [BrowserModule, GraphQLModule, HttpClientModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FetchExampleComponent } from './fetch-example/fetch-example.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'fetch-example', component: FetchExampleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterExampleComponent } from './counter-example/counter-example.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'counter-example', component: CounterExampleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

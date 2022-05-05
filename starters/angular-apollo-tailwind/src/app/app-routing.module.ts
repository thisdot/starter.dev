import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CounterExampleComponent } from './counter-example/counter-example.component';
import { FetchExampleComponent } from './fetch-example/fetch-example.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'counter',
        component: CounterExampleComponent,
    },
    {
        path: 'api-example',
        component: FetchExampleComponent,
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getGreeting } from '../state/greeting/greeting.selectors';
import * as GreetingActions from '../state/greeting/greeting.actions';

@Component({
  selector: 'app-fetch-example',
  templateUrl: './fetch-example.component.html',
  styleUrls: ['./fetch-example.component.scss'],
})
export class FetchExampleComponent implements OnInit {
  greeting$ = this.store.select(getGreeting);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(GreetingActions.getGreeting({ greeting: 'from This Dot Labs!' }));
  }
}

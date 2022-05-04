import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getGreeting } from '../state/greeting/greeting.actions';
import { greetingMessage, loadingStatus, errorMessage } from '../state/greeting/greeting.selectors';

@Component({
  selector: 'app-fetch-example',
  templateUrl: './fetch-example.component.html',
  styleUrls: ['./fetch-example.component.scss'],
})
export class FetchExampleComponent implements OnInit {
  greeting$ = this.store.select(greetingMessage);
  error$ = this.store.select(errorMessage);
  isLoading$ = this.store.select(loadingStatus);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getGreeting({ greeting: 'angular-ngrx-scss starter.dev!' }));
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchExampleComponent } from './fetch-example.component';

describe('FetchExampleComponent', () => {
  let component: FetchExampleComponent;
  let fixture: ComponentFixture<FetchExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchExampleComponent ]
    })
    .compileComponents();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HelloService } from './hello.service';

@Component({
  selector: 'app-fetch-example',
  templateUrl: './fetch-example.component.html',
  styleUrls: ['./fetch-example.component.scss']
})
export class FetchExampleComponent implements OnInit {

  private message: string = 'angular-apollo-tailwind starter.dev!'
  helloMessage$!: Observable<any>;

  constructor(
    private helloService: HelloService
  ) { }

  ngOnInit(): void {
    this.helloMessage$ = this.helloService.getHelloMessage(this.message)
  }

}

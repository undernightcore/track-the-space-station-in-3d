import { Component, OnInit } from '@angular/core';
import {AppManagerService} from "../../services/app-manager.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':leave',
          [
            style({ height: 300, opacity: 1 }),
            animate('3s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class HomeComponent {

  constructor(public appManagerService: AppManagerService) { }

  onReady() {
    this.appManagerService.ready.next(true);
  }

}

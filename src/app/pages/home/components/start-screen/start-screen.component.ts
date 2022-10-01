import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AppManagerService} from "../../../../services/app-manager.service";

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  @Output() ready = new EventEmitter<void>();

  constructor(public appManagerService: AppManagerService) { }

  ngOnInit(): void {
  }

}

import {Component} from '@angular/core';
import {TLEService} from "../../../../services/tle.service";

@Component({
  selector: 'app-main-ui',
  templateUrl: './main-ui.component.html',
  styleUrls: ['./main-ui.component.scss']
})
export class MainUiComponent {
  lat = '';
  lng = '';

  constructor(tleService: TLEService) {
    tleService.issPosition.subscribe(({lat, lng}) => {
      this.lat = lat.toString();
      this.lng = lng.toString();
    })
  }

}

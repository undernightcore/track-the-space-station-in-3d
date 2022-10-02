import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {getLatLngObj, LatLngObject} from "tle.js";
import {Subject} from "rxjs";
import {propagate, twoline2satrec} from 'satellite.js'
import {DateTime} from "luxon";

interface TLEApiResponseInterface {
  satelliteId: number;
  name: string;
  date: Date;
  line1: string;
  line2: string;
}

@Injectable({
  providedIn: 'root'
})
export class TLEService {
  TLE = {
    line1: "1 25544U 98067A   22275.23091245  .00058352  00000-0  10342-2 0  9999",
    line2: "2 25544  51.6417 166.2459 0003022 250.0408 254.8118 15.49684437361780"
  };
  issPosition = new Subject<LatLngObject>();

  constructor(private https: HttpClient) {
  }

  storeISSTLEnow() {
    // const url = 'https://tle.ivanstanojevic.me/api/tle/25544'
    // this.https.request<TLEApiResponseInterface>('get', url).subscribe(tle => {
    //   this.TLE = {line1: tle.line1, line2: tle.line2}
    // });
  }

  getGeocentricISSCords() {
    const satrec = twoline2satrec(this.TLE.line1, this.TLE.line2);
    const {position} = propagate(satrec, DateTime.now().toUTC().toJSDate());
    return position;
  }

  getISSLatLongTLEnow(): LatLngObject {
    const tleString = this.TLE.line1 + '\n' + this.TLE.line2
    return getLatLngObj(tleString, new Date().getTime());
  }

  #mapTLEtoLatLng(tle: TLEApiResponseInterface) {
    const tleString = tle.line1 + '\n' + tle.line2
    return getLatLngObj(tleString, new Date().getTime());
  }
}

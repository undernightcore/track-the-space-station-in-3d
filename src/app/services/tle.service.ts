import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {getLatLngObj, LatLngObject} from "tle.js";
import {map, Observable} from "rxjs";
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
    line1: "1 25544C 98067A   22288.25694444 -.00108826  00000-0 -19041-2 0   603",
    line2: "2 25544  51.6404 101.7363 0003749 305.5811 203.4572 15.49999535    12"
  };

  constructor(private https: HttpClient) {
  }

  storeISSTLEnow() {
    const url = 'https://tle.ivanstanojevic.me/api/tle/25544'
    this.https.request<TLEApiResponseInterface>('get', url).subscribe(tle => {
      this.TLE = {line1: tle.line1, line2: tle.line2}
    });
  }

  getGeocentricISSCords() {
    const satrec = twoline2satrec(this.TLE.line1, this.TLE.line2);
    const {position} = propagate(satrec, DateTime.now().toUTC().toJSDate());
    return position;
  }

  getISSModuleTLEnow(): Observable<LatLngObject> {
    const url = 'https://tle.ivanstanojevic.me/api/tle/49044'
    return this.https.request<TLEApiResponseInterface>('get', url).pipe(map(this.#mapTLEtoLatLng));
  }

  #mapTLEtoLatLng(tle: TLEApiResponseInterface) {
    const tleString = tle.line1 + '\n' + tle.line2
    return getLatLngObj(tleString, new Date().getTime());
  }
}

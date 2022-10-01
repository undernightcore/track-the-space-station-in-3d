import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {getLatLngObj, LatLngObject} from "tle.js";
import {map, Observable} from "rxjs";


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

  constructor(private https: HttpClient) { }

  getISSTLEnow(): Observable<LatLngObject> {
    const url = 'https://tle.ivanstanojevic.me/api/tle/25544'
    return this.https.request<TLEApiResponseInterface>('get',url).pipe(map(this.#mapTLEtoLatLng));
  }

  getISSModuleTLEnow(): Observable<LatLngObject> {
    const url = 'https://tle.ivanstanojevic.me/api/tle/49044'
    return this.https.request<TLEApiResponseInterface>('get',url).pipe(map(this.#mapTLEtoLatLng));
  }

  #mapTLEtoLatLng(tle: TLEApiResponseInterface) {
    const tleString = tle.line1 + '\n' + tle.line2
    return getLatLngObj(tleString, new Date().getTime());
  }
}

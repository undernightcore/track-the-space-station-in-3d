import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppManagerService {

  loading = new BehaviorSubject<boolean>(true);
  ready = new BehaviorSubject<boolean>(false);

  constructor() { }
}

import {Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppManagerService {

  loading = new BehaviorSubject<boolean>(true);
  ready = new BehaviorSubject<boolean>(false);
  bottomButtons?: TemplateRef<any>;

  constructor() {
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import { LibraryData } from '../models/library';
import { BaseApiService } from './base-api.service';
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public subjectId = new Subject<string>();
  public _items$ = new BehaviorSubject<any>(null);
  constructor(private api: BaseApiService) { }

  // Getters
  get items$() {
    return this._items$.asObservable();
  }

  sendData(api: string, data: any): Observable<LibraryData> {
    return this.api.post(api, {id: uuidv4(), ...data});
  }

  getDataById(api: string, id: string): Observable<LibraryData> {
    return this.api.get(`${api}/${id}`);
  }

  dataUptade(api: string, data: any): Observable<any> {
    return this.api.put(api, {id: uuidv4(), ...data});
  }
  sendDataId(newData){
    this.subjectId.next(newData);
  }
}

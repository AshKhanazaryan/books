import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import {LibraryData} from '../models/library';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  public authorsList: LibraryData[] = [];
  constructor(private api: BaseApiService) { }

  getAuthorsList(): Observable<any> {
    return this.api.get(`/author`)
  }

  deleteAuthor(id: string): Observable<any> {
    return this.api.delete(`/author/${id}`);
  }
}

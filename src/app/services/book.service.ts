import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseApiService} from './base-api.service';
import {LibraryData} from '../models/library';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public booksList: LibraryData[] = [];

  constructor(private api: BaseApiService) {
  }

  getBooksList(): Observable<any> {
    return this.api.get(`/book`);
  }

  deleteBook(id: string): Observable<any> {
    return this.api.delete(`/book/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibraryData } from '../models/library';
import { BaseApiService } from './base-api.service';
import {v4 as uuidv4} from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class GenresService {
  public genresList: LibraryData[] = [];

  constructor(private api: BaseApiService) { }

    getGenresList(): Observable<any> {
      return this.api.get(`/genres`);
    }

    deleteGenres(id: string): Observable<any> {
      return this.api.delete(`/genres/${id}`);
    }
}

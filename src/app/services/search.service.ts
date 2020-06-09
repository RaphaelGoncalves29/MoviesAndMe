import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { map } from 'rxjs/operators';
import { TvShow } from '../models/tvShow.models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  token = 'cd82f2654fe7cc3daa90f58e0d9de9f9';

  constructor(private httpClient: HttpClient) {}

  searchMovie(title): Observable<Movie[]> {
    return this.httpClient
    .get<Movie[]>(
        'https://api.themoviedb.org/3/search/movie?api_key=' +
          this.token +
          '&language=fr&query=' +
          title
      )
      .pipe(map((response: any) => response.results));
  }

  searchTvShow(title): Observable<TvShow[]> {
    return this.httpClient.get<TvShow[]>(
      'https://api.themoviedb.org/3/search/tv?api_key=' +
        this.token +
        '&language=fr&query=' +
        title
    )
    .pipe(map((response: any) => response.results));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TvShow } from '../models/tvShow.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {
  url: any;
  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:3000/tvShows/';
   }

   addTvShow(tv: TvShow) {
    this.httpClient.post(this.url, tv).subscribe(
      () => {
        console.log('Tv Show saved !');
      },
      (error) => {
        console.log('Error : ' + error);
      }
    );
  }

  getTvShows(): Observable<TvShow[]> {
    return this.httpClient.get<TvShow[]>(this.url);
  }

  deleteTvShow(id: number): Observable<any> {
    return this.httpClient.delete(this.url + id);
  }

  updateStatusTvShow(tv: TvShow): Observable<TvShow> {
    return this.httpClient.put<TvShow>(this.url + tv.id, tv);
  }
}

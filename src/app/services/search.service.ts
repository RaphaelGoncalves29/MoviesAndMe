import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  moviesSubject = new Subject<any[]>();
  
  private moviesSearched = [];
  token = 'cd82f2654fe7cc3daa90f58e0d9de9f9';

  constructor(private httpClient: HttpClient) { }

  emitMoviesSubject() {
    this.moviesSubject.next(this.moviesSearched.slice());
  }

  // getSearchedMovies() {
  //   this.httpClient
  //     .get<any[]>('https://api.themoviedb.org/3/search/movie?api_key='+this.token+'&language=fr&query=star wars')
  //     .subscribe(
  //       (response) => {
  //         this.moviesSearched = response
  //         console.log('getSearchedMovies')
  //         console.log(this.moviesSearched)
  //         this.emitMoviesSubject();
  //       },
  //       (error) => {
  //         console.log('Erreur de chargement ! ' + error);
  //       }
  //     )
  // }

  // getSearch(): Observable<any[]> {
  //   return this.httpClient.get<any[]>('https://api.themoviedb.org/3/search/movie?api_key='+this.token+'&language=fr&query=star wars')
  // }

  // fetchData() {
  //   return this.httpClient.get('https://api.themoviedb.org/3/search/movie?api_key='+this.token+'&language=fr&query=star wars')
  // }

  searchTest(title) {
      return this.httpClient.get('https://api.themoviedb.org/3/search/movie?api_key='+this.token+'&language=fr&query='+title)
    }


  



}

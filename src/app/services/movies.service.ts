import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  url: any;
  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:3000/movies/';
  }

  addMovie(movie: Movie) {
    this.httpClient.post(this.url, movie).subscribe(
      () => {
        console.log('Movie saved !');
      },
      (error) => {
        console.log('Error : ' + error);
      }
    );
  }

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.url);
  }

  deleteMovie(id: number): Observable<any> {
    return this.httpClient.delete(this.url + id);
  }
}

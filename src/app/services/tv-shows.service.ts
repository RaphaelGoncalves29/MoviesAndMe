import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  constructor(private httpClient: HttpClient) {
   }

   getTest() {
     return this.httpClient.get<any[]>('https://jsonplaceholder.typicode.com/comments')
   }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { Movie } from "../models/movie.model";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  token = "cd82f2654fe7cc3daa90f58e0d9de9f9";

  constructor(private httpClient: HttpClient) {}

  searchMovie(title) {
    return this.httpClient.get(
      "https://api.themoviedb.org/3/search/movie?api_key=" +
        this.token +
        "&language=fr&query=" +
        title
    );
  }

  searchTvShow(title) {
    return this.httpClient.get(
      "https://api.themoviedb.org/3/search/tv?api_key=" +
        this.token +
        "&language=fr&query=" +
        title
    );
  }
}

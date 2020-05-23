import { Component, OnInit } from "@angular/core";
import { Movie } from "src/app/models/movie.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SearchService } from "src/app/services/search.service";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.scss"],
})
export class MovieComponent implements OnInit {
  movies: Movie[];
  movieTitleSearch: string;
  isMovie: boolean;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.isMovie = true;
  }

  getOutputVal(movieTitleSearch: string) {
    if (movieTitleSearch) {
      this.searchService.searchMovie(movieTitleSearch).subscribe((res) => {
        this.movies = res;
      });
    }
  }
}

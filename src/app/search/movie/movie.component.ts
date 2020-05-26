import { Component, OnInit } from "@angular/core";
import { Movie } from "src/app/models/movie.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SearchService } from "src/app/services/search.service";
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.scss"],
})
export class MovieComponent implements OnInit {
  movies: Movie[];
  movieTitleSearch: string;
  isMovie: boolean;

  moviesId = [];

  constructor(private searchService: SearchService, private movieService: MoviesService) {}

  ngOnInit(): void {
    this.isMovie = true;

    this.movieService.getMovies()
      .subscribe((res) => { 
        for(var i=0; i < res.length; i++){
          this.moviesId.push(res[i].idMovie);
        }
      });
      // console.log(this.moviesId)
  }

  getOutputVal(movieTitleSearch: string) {
    if (movieTitleSearch) {
      this.searchService.searchMovie(movieTitleSearch).subscribe((res) => {
        this.movies = res;
      });
    }
  }
}

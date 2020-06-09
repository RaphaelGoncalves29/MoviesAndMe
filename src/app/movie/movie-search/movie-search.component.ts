import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  movies: Movie[];
  movieTitleSearch: string;
  isMovie: boolean;
  moviesId = [];

  constructor(private searchService: SearchService, private movieService: MoviesService) { }

  ngOnInit(): void {
    this.isMovie = true;

    this.movieService.getMovies()
      .subscribe((res) => {
        for ( let i = 0; i < res.length; i++ ) {
          this.moviesId.push(res[i].idMovie);
        }
      });
  }

  getOutputVal(movieTitleSearch: string) {
    if (movieTitleSearch) {
      this.searchService.searchMovie(movieTitleSearch).subscribe((res) => {
        this.movies = res;
      });
    }
  }

}

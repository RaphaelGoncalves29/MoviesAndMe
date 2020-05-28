import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MoviesService } from 'src/app/services/movies.service';
import { TvShowsService } from 'src/app/services/tv-shows.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {
  @Input() indexOfMovie: number;
  @Input() movie: Movie;

  @Input() moviesId = [];

  movieButton: boolean;

  constructor(private movieService: MoviesService,
    private tvShowsService: TvShowsService,
    private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    for (var i = 0; i < this.moviesId.length; i++) {
      if (this.movie.id === this.moviesId[i]) {
        this.movieButton = false;
      }
    }
  }

  addMovie(movie: Movie) {
    const newMovie = new Movie();
    newMovie.idMovie = movie.id;
    newMovie.title = movie.title;
    newMovie.original_title = movie.original_title;
    newMovie.poster_path = movie.poster_path;
    newMovie.release_date = movie.release_date;
    newMovie.vote_average = movie.vote_average;

    this.movieService.addMovie(newMovie);
    this.openSnackBar("Movie added !");

    this.movieButton = false;
  }

  openSnackBar(item: string) {
    this._snackBar.open(item ,"Close", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }

}

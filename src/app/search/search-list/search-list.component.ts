import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MoviesService } from 'src/app/services/movies.service';
import { TvShowsService } from 'src/app/services/tv-shows.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TvShow } from 'src/app/models/tvShow.models';
import * as firebase from 'firebase';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {
  @Input() movie: Movie;
  @Input() moviesId = [];

  @Input() tv: TvShow;
  @Input() tvShowsId = [];

  movieButton: boolean;
  tvButton : boolean;

  isAuth: boolean;

  constructor(private moviesService: MoviesService,
    private tvShowsService: TvShowsService,
    private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.initMovieButton();
    this.initTvButton();

    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    )
  }

  initMovieButton() {
    for (var i = 0; i < this.moviesId.length; i++) {
      if (this.movie.id === this.moviesId[i]) {
        this.movieButton = false;
      }
    }
  }

  initTvButton() {
    for (var i = 0; i < this.tvShowsId.length; i++) {
      if (this.tv.id === this.tvShowsId[i]) {
        this.tvButton = false;
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

    this.moviesService.addMovie(newMovie);
    this.openSnackBar('Movie added !');

    this.movieButton = false;
  }

  addTvShow(tvShow: TvShow) {
    const newTvShow = new TvShow();
    newTvShow.idTv = tvShow.id;
    newTvShow.name = tvShow.name;
    newTvShow.poster_path = tvShow.poster_path;
    newTvShow.first_air_date = tvShow.first_air_date;
    newTvShow.vote_average = tvShow.vote_average
    newTvShow.status = 0;

    this.tvShowsService.addTvShow(newTvShow);
    this.openSnackBar('Tv Show added !');

    this.tvButton = false;
  }

  openSnackBar(item: string) {
    this._snackBar.open(item ,"Close", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
    });
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Movie } from "../models/movie.model";
import { TvShow } from "../models/tvShow.models";
import { MoviesService } from "../services/movies.service";
import { TvShowsService } from "../services/tv-shows.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  @Input() indexOfMovie: number;
  @Input() movie: Movie;
  @Input() movieList: boolean;

  
  // @Output() outputToParentMovie = new EventEmitter<number>();
  @Output() outputToParentMovie = new EventEmitter<number>()

  @Input() moviesId = [];

  movieButton: boolean;

  @Input() indexOfTv: number;
  @Input() tv: TvShow;

  @Input() tvShowList: boolean;

  durationInSeconds = 5;

  constructor(
    private movieService: MoviesService,
    private tvShowsService: TvShowsService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

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
    newMovie.overview = movie.overview;
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

  removeMovie(movie: Movie) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = movie;

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      console.log("Dialog output:", data);
      if (data === true) {
        this.movieService.deleteMovie(movie.id).subscribe();
        this.outputToParentMovie.emit(this.indexOfMovie);
        this.openSnackBar('Movie removed !');
      }
    });
  }
}

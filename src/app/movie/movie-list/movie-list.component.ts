import { Component, OnInit, ViewChild } from "@angular/core";
import { Movie } from "src/app/models/movie.model";
import { MoviesService } from "src/app/services/movies.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogComponent } from "src/app/dialog/dialog.component";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.scss"],
})
export class MovieListComponent implements OnInit {
  displayedColumns: string[] = [
    "poster",
    "title",
    "originalTitle",
    "date",
    "action",
  ];
  movies: Movie[];
  size: number;

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private movieService: MoviesService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((res) => {
      this.movies = res;
      this.size = this.movies.length;
      this.dataSource = new MatTableDataSource(this.movies);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  openSnackBar(item: string) {
    this._snackBar.open(item, "Close", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }

  remove(movie: Movie) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = movie;

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      console.log("Dialog output:", data);
      if (data === true) {
        this.movieService.deleteMovie(movie.id).subscribe();
        this.dataSource.data.splice(this.movies.indexOf(movie), 1);
        this.dataSource = new MatTableDataSource<Movie>(this.dataSource.data);
        this.openSnackBar("Movie removed !");
      }
    });
  }
}
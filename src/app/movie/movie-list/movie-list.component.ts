import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MoviesService } from 'src/app/services/movies.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ExporterService } from 'src/app/services/exporter.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  displayedColumns: string[] = [
    'poster',
    'title',
    'original_title',
    'date',
    'vote',
    'remove',
  ];
  movies: Movie[];
  size: number;

  dataSource: MatTableDataSource<Movie>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private moviesService: MoviesService,
    private exporterService: ExporterService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.size = 0;
    this.moviesService.getMovies().subscribe((res) => {
      this.movies = res;
      this.size = this.movies.length;
      this.dataSource = new MatTableDataSource(this.movies);
      this.dataSource.paginator = this.paginator;
    });
  }

  openSnackBar(item: string) {
    this.snackBar.open(item, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  remove(movie: Movie) {
    const isMovie = true;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {movie, isMovie};

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data === true) {
        this.moviesService.deleteMovie(movie.id).subscribe();
        this.dataSource.data.splice(this.movies.indexOf(movie), 1);
        this.dataSource = new MatTableDataSource<Movie>(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        this.size--;
        this.openSnackBar('Movie removed !');
      }
    });
  }

  exportAsXLSX(): void {
    this.exporterService.exportToExcel(this.dataSource.data, 'movies');
  }
}

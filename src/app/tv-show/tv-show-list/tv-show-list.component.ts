import { Component, OnInit, ViewChild } from '@angular/core';
import { TvShow } from 'src/app/models/tvShow.models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TvShowsService } from 'src/app/services/tv-shows.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ExporterService } from 'src/app/services/exporter.service';

@Component({
  selector: 'app-tv-show-list',
  templateUrl: './tv-show-list.component.html',
  styleUrls: ['./tv-show-list.component.scss'],
})
export class TvShowListComponent implements OnInit {
  displayedColumns: string[] = [
    'poster',
    'title',
    'status',
    'date',
    'vote',
    'update',
    'remove',
  ];
  tvShows: TvShow[];

  tvShowsFinished: number;
  tvWasFinished: boolean;

  tvShowsWaiting: number;
  tvWasWaiting: boolean;

  tvShowsWatching: number;
  tvWasWatching: boolean;

  updatedTvShow: TvShow;

  dataSource: MatTableDataSource<TvShow>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private tvShowsService: TvShowsService,
    private exporterService: ExporterService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.tvShowsFinished = 0;
    this.tvShowsWaiting = 0;
    this.tvShowsWatching = 0;

    this.tvShowsService.getTvShows().subscribe((res) => {
      this.tvShows = res;
      for (var i = 0; i < this.tvShows.length; i++) {
        switch (this.tvShows[i].status) {
          case 1:
            this.tvShowsFinished++;
            break;
          case 2:
            this.tvShowsWaiting++;
            break;
          case 3:
            this.tvShowsWatching++;
            break;
        }
      }
      this.dataSource = new MatTableDataSource(this.tvShows);
      this.dataSource.paginator = this.paginator;
    });
  }

  openSnackBar(item: string) {
    this._snackBar.open(item, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  remove(tvShow: TvShow) {
    const isTvShow = true;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = { tvShow, isTvShow };

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data === true) {
        this.tvShowsService.deleteTvShow(tvShow.id).subscribe();
        this.dataSource.data.splice(this.tvShows.indexOf(tvShow), 1);
        this.dataSource = new MatTableDataSource<TvShow>(this.dataSource.data);
        switch (tvShow.status) {
          case 1:
            this.tvShowsFinished--;
            break;
          case 2:
            this.tvShowsWaiting--;
            break;
          case 3:
            this.tvShowsWatching--;
        }
        this.openSnackBar('Tv Show removed !');
      }
    });
  }

  update(tvShow: TvShow) {
    switch (tvShow.status) {
      case 1:
        this.tvWasFinished = true;
        break;
      case 2:
        this.tvWasWaiting = true;
        break;
      case 3:
        this.tvWasWatching = true;
        break;
    }

    const isUpdate = true;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = { tvShow, isUpdate };

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data >= 0 && data <= 3) {
        tvShow.status = data;
        this.tvShowsService.updateStatusTvShow(tvShow).subscribe(() => {
          switch (data) {
            case 1:
              this.tvShowsFinished++;
              break;
            case 2:
              this.tvShowsWaiting++;
              break;
            case 3:
              this.tvShowsWatching++;
          }

          if (this.tvWasFinished) {
            this.tvShowsFinished--;
            this.tvWasFinished = false;
          } else if (this.tvWasWaiting) {
            this.tvShowsWaiting--;
            this.tvWasWaiting = false;
          } else if (this.tvWasWatching) {
            this.tvShowsWatching--;
            this.tvWasWatching = false;
          }
          this.openSnackBar('Tv Show update !');
        });
      }
    });
  }

  exportAsXLSX(): void {
    this.exporterService.exportToExcel(this.dataSource.data, 'tv-shows');
  }
}

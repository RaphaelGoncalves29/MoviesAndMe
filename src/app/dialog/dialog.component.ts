import { Component, OnInit, Optional, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Movie } from "../models/movie.model";
import { TvShow } from "../models/tvShow.models";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
  myDropDown: string;

  movie: Movie;
  isMovie: boolean;
  deleted: boolean;
  tvShow: TvShow;
  isTvShow: boolean;
  isUpdate: boolean;
  updateButton: boolean;
  newStatus: number;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isTvShow = data.isTvShow;
    this.tvShow = data.tvShow;

    this.isMovie = data.isMovie;
    this.movie = data.movie;

    this.isUpdate = data.isUpdate;
  }

  ngOnInit(): void {
    this.updateButton = false;
  }

  close() {
    this.dialogRef.close();
  }

  remove() {
    this.deleted = true;
    this.dialogRef.close(this.deleted);
  }

  onChangeofOptions(newOption) {
    this.updateButton = true;
    this.newStatus = parseInt(newOption);
  }

  update() {
    this.dialogRef.close(this.newStatus);
  }
}

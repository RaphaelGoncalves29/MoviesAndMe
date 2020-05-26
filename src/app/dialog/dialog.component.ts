import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  movie: Movie;
  deleted: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movie = data;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  remove() {
    this.deleted = true;
    this.dialogRef.close(this.deleted)
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../models/movie.model';
import { TvShow } from '../models/tvShow.models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() indexOfMovie: number;
  @Input() movie: Movie;

  @Input() indexOfTv:number;
  @Input() tv: TvShow;


  constructor() { }

  ngOnInit(): void {
  }

  addMovie(movie) {
    console.log(movie)
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() movieTitle: string;
  @Input() movieVote: number;
  @Input() movieDate: Date;
  @Input() moviePoster: string;
  @Input() indexOfMovie: number;
  @Input() movieText: string

  constructor() { }

  ngOnInit(): void {
  }

}

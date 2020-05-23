import { Component, OnInit } from "@angular/core";
import { TvShow } from "src/app/models/tvShow.models";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SearchService } from "src/app/services/search.service";

@Component({
  selector: "app-tv-show",
  templateUrl: "./tv-show.component.html",
  styleUrls: ["./tv-show.component.scss"],
})
export class TvShowComponent implements OnInit {
  tvShows: TvShow[];
  isMovie: boolean;

  constructor(
    private searchService: SearchService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isMovie = false;
  }

  getOutputVal(tvTitleSearch: string) {
    if (tvTitleSearch) {
      this.searchService.searchTvShow(tvTitleSearch).subscribe((res) => {
        this.tvShows = res;
      });
    }
  }
}

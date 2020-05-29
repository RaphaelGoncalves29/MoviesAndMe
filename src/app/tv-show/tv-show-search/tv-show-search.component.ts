import { Component, OnInit } from "@angular/core";
import { TvShow } from "src/app/models/tvShow.models";
import { SearchService } from "src/app/services/search.service";
import { TvShowsService } from "src/app/services/tv-shows.service";

@Component({
  selector: "app-tv-show-search",
  templateUrl: "./tv-show-search.component.html",
  styleUrls: ["./tv-show-search.component.scss"],
})
export class TvShowSearchComponent implements OnInit {
  tvShows: TvShow[];
  tvTitleSearch: string;
  tvShowsId = [];

  constructor(
    private searchService: SearchService,
    private tvShowService: TvShowsService
  ) {}

  ngOnInit(): void {
    this.tvShowService.getTvShows().subscribe((res) => {
      for (var i = 0; i < res.length; i++) {
        this.tvShowsId.push(res[i].idTv);
      }
    });
  }

  getOutputVal(tvTitleSearch: string) {
    if (tvTitleSearch) {
      this.searchService.searchTvShow(tvTitleSearch).subscribe((res) => {
        this.tvShows = res;
      });
    }
  }
}

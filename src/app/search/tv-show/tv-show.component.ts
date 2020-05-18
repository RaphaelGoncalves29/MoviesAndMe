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
  tvForm: FormGroup;

  constructor(
    private searchService: SearchService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.tvForm = this.formBuilder.group({
      title: ["", Validators.required],
    });
  }

  submitForm() {
    const formValue = this.tvForm.value;
    const tvSearch = formValue["title"];

    this.searchService
      .searchTvShow(tvSearch)
      .subscribe((res) => (this.tvShows = res));
  }
}

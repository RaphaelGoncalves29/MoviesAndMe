import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { SearchService } from "../services/search.service";
import { Movie } from "../models/movie.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  movies: any = [];
  tvShows: any = [];
  movieForm: FormGroup;
  tvForm: FormGroup;
  movieClick: boolean;

  constructor(
    private searchService: SearchService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initMovieForm();
    this.initTvForm();
    this.movieClick = true;
  }

  initMovieForm() {
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  initTvForm() {
    this.tvForm = this.formBuilder.group({
      title: ['', Validators.required]
    })
  }

  submitMovieForm() {
    const formValue = this.movieForm.value;
    const movieSearch = formValue['title'];

    this.searchService
      .searchMovie(movieSearch)
      .subscribe((res) => (this.movies = res));

    console.log('coucou')
    console.log(this.movies) 
  }

  submitTvForm() {
    console.log('ok')
    const formValue = this.tvForm.value;
    const tvSearch = formValue['title'];

    this.searchService
      .searchTvShow(tvSearch)
      .subscribe((res) => (this.tvShows = res));
  }


  clickItem() {
    this.movieClick = !this.movieClick;
  }
}

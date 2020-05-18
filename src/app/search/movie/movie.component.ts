import { Component, OnInit } from "@angular/core";
import { Movie } from "src/app/models/movie.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SearchService } from "src/app/services/search.service";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.scss"],
})
export class MovieComponent implements OnInit {
  movies: Movie[];
  movieForm: FormGroup;

  constructor(
    private searchService: SearchService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.movieForm = this.formBuilder.group({
      title: ["", Validators.required],
    });
  }

  submitForm() {
    const formValue = this.movieForm.value;
    const movieSearch = formValue["title"];

    this.searchService
      .searchMovie(movieSearch)
      .subscribe((res) => (this.movies = res));
  }
}

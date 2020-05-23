import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() isMovie: boolean;
  movieForm: FormGroup;
  tvForm: FormGroup;

  @Output() outputToParent = new EventEmitter<Movie[]>();

  constructor(private searchService: SearchService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initMovieForm();
    this.initTvForm();
  }

  initMovieForm() {
    this.movieForm = this.formBuilder.group({
      title: ["", Validators.required],
    });
  }

  initTvForm() {
    this.tvForm = this.formBuilder.group({
      title: ["", Validators.required],
    });
  }

  submitMovieForm() {
    const formValue = this.movieForm.value;
    const movieSearch = formValue["title"];
    this.outputToParent.emit(movieSearch);
  }

  submitTvForm() {
    const formValue = this.tvForm.value;
    const movieSearch = formValue["title"];
    this.outputToParent.emit(movieSearch);
  }

}

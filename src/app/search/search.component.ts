import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '../services/search.service';
import { Movie } from '../models/movie.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  data:any = []
  movieForm: FormGroup;

  movies: Movie[];
  title = 'image-gallery';

  movieTest: any[];
  moviesSubscription: Subscription;

  constructor(private searchService: SearchService, private formBuilder: FormBuilder) { }

  ngOnInit()  {
    this.initForm();
  }

  // getData() {
  //   // const url ='https://jsonplaceholder.typicode.com/users'
  //   // const url = 'https://api.themoviedb.org/3/search/movie?api_key=cd82f2654fe7cc3daa90f58e0d9de9f9&language=fr&query=star wars'
  //   // this.http.get(url).subscribe((res)=>{
  //   //   this.data = res
  //   // console.log('oucou')
  //   //  console.log(this.data)
  // //  })
    
  // }

  // getData() {
  //   this.searchService.getSearch()
  //     .subscribe( res => this.data = res)

  //   console.log('getData')
  //   console.log(this.data)
  // }

  initForm() {
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required]
    })
  }

  submitForm() {
    const formValue = this.movieForm.value;
    const movieSearch = formValue['title'];
    console.log(movieSearch)

    this.searchService.searchTest(movieSearch)
      .subscribe( res => this.data = res)
  }

}
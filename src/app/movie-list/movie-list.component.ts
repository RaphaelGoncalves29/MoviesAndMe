import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: Movie[];
  movieList: boolean;
  size: number;

  moviesId = [];

  config: any;

  constructor(private movieService: MoviesService, private route: ActivatedRoute, private router: Router) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 20,
      totalItems: 0
    }

    route.queryParams.subscribe(
      params=>this.config.currentPage = params['page'] ? params['page']:1);
   }

  ngOnInit(): void {
    this.movieList = true;

    this.movieService.getMovies()
      .subscribe((res) => { 
        this.movies = res;
        this.size = this.movies.length
      });
  }

  pageChange(newPage: number) {
    this.router.navigate(['movies'], { queryParams: { page: newPage} });
  }

  getOutputVal(param: number) {
    this.movies.splice(param, 1);
  }

}

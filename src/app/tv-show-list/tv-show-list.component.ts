import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TvShowsService } from '../services/tv-shows.service';

@Component({
  selector: 'app-tv-show-list',
  templateUrl: './tv-show-list.component.html',
  styleUrls: ['./tv-show-list.component.scss']
})
export class TvShowListComponent implements OnInit {
  config: any;
  collection: any[];

  constructor(private route: ActivatedRoute, private router: Router, private service: TvShowsService ) { 
    this.config = {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0
    }
    route.queryParams.subscribe(
      params=>this.config.currentPage = params['page'] ? params['page']:1);
    
      // for (let i = 1; i <= 100; i++) {
      //   this.collection.push(`item ${i}`);
      //   }
  }

  ngOnInit(): void {
    this.service.getTest().subscribe(
      (res) => {
        this.collection = res;
      }
    )
  }

  pageChange(newPage: number) {
    this.router.navigate(['tv-shows'], { queryParams: { page: newPage} });
  }
  

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { TvShowListComponent } from './tv-show-list/tv-show-list.component';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from './services/search.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieComponent } from './search/movie/movie.component';
import { TvShowComponent } from './search/tv-show/tv-show.component';
import { ListComponent } from './list/list.component';


const appRoutes: Routes = [
  { path: 'movies', component: MovieListComponent },
  { path: 'tv-shows', component: TvShowListComponent },
  { path: 'search/movie', component: MovieComponent },
  { path: 'search/tv-show', component: TvShowComponent },
  { path: '', redirectTo: 'search/movie', pathMatch: 'full'},
  { path: '**', redirectTo: "search/movie"}
];

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    TvShowListComponent,
    HeaderComponent,
    MovieComponent,
    TvShowComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }

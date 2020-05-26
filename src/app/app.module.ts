import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TvShowListComponent } from './tv-show-list/tv-show-list.component';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from './services/search.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieComponent } from './search/movie/movie.component';
import { TvShowComponent } from './search/tv-show/tv-show.component';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './search/search/search.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatMenuModule} from '@angular/material/menu';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


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
    TvShowListComponent,
    HeaderComponent,
    MovieComponent,
    TvShowComponent,
    ListComponent,
    SearchComponent,
    MovieListComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }

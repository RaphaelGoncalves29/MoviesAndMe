import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TvShowListComponent } from './tv-show-list/tv-show-list.component';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from './services/search.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TvShowComponent } from './search/tv-show/tv-show.component';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './search/search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatMenuModule} from '@angular/material/menu';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MovieSearchComponent } from './movie/movie-search/movie-search.component';
import { SearchListComponent } from './search/search-list/search-list.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';



const appRoutes: Routes = [
  { path: 'movies', component: MovieListComponent },
  { path: 'tv-shows', component: TvShowListComponent },
  { path: 'search/movie', component: MovieSearchComponent },
  { path: 'search/tv-show', component: TvShowComponent },
  { path: '', redirectTo: 'search/movie', pathMatch: 'full'},
  { path: '**', redirectTo: "search/movie"}
];

@NgModule({
  declarations: [
    AppComponent,
    TvShowListComponent,
    HeaderComponent,
    TvShowComponent,
    ListComponent,
    SearchComponent,
    MovieListComponent,
    DialogComponent,
    MovieSearchComponent,
    SearchListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    FormsModule,
    MatTableModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatProgressBarModule,
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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from './services/search.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { TvShowSearchComponent } from './tv-show/tv-show-search/tv-show-search.component';
import { TvShowListComponent } from './tv-show/tv-show-list/tv-show-list.component';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import {MatInputModule} from '@angular/material/input';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'movies', canActivate: [AuthGuardService], component: MovieListComponent },
  { path: 'tv-shows', canActivate: [AuthGuardService], component: TvShowListComponent },
  { path: 'search/movie', component: MovieSearchComponent },
  { path: 'search/tv-show', component: TvShowSearchComponent },
  { path: '', redirectTo: 'search/movie', pathMatch: 'full'},
  { path: '**', redirectTo: 'search/movie'}
];

@NgModule({
  declarations: [
    AppComponent,
    TvShowListComponent,
    HeaderComponent,
    SearchComponent,
    MovieListComponent,
    DialogComponent,
    MovieSearchComponent,
    SearchListComponent,
    TvShowSearchComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDialogModule,
    MatMenuModule,
    FormsModule,
    MatTableModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }

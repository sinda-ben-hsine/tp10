import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsComponent } from './films/films.component';
import { AddFilmComponent } from './add-film/add-film.component';
import { UpdateFilmComponent } from './update-film/update-film.component';
import { LoginComponent } from './login/login.component';
import { FilmGuard } from './film.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ListeGenresComponent } from './liste-genres/liste-genres.component';

const routes: Routes = [
  { path: "films", component: FilmsComponent },
  { path: "add-film", component: AddFilmComponent, canActivate: [FilmGuard] },
  { path: "updateFilm/:id", component: UpdateFilmComponent },
  { path: "login", component: LoginComponent },
  { path: "app-forbidden", component: ForbiddenComponent },
  { path: "listeGenres", component: ListeGenresComponent },
  { path: "", redirectTo: "films", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

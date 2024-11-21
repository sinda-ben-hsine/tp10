import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilmService } from '../services/film.service';
import { films } from '../model/film.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
})
export class FilmsComponent implements OnInit {
  films: films[];

  constructor(
    private filmService: FilmService,
    private router: Router,
    public authService: AuthService
  ) {
    // Initialize films array
    this.films = this.filmService.listeFilms();
  }

  ngOnInit(): void {
    // Optionally refresh films list when the component is initialized
    this.films = this.filmService.listeFilms();
  }

  supprimerFilm(film: films): void {
    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer ce film ?');
    if (confirmDelete) {
      this.filmService.supprimerFilm(film);
      this.films = this.filmService.listeFilms(); // Refresh list
    }
  }
}

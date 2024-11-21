import { Component, OnInit } from '@angular/core';
import { Genre } from '../model/genre.model';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-liste-genres',
  templateUrl: './liste-genres.component.html',
  styles: []
})
export class ListeGenresComponent implements OnInit {
  genres: Genre[] = [];
  ajout: boolean = true;
  updatedGenre: Genre = { idGen: 0, nomGen: '' };

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.chargerGenre();
  }

  chargerGenre(): void {
    this.genres = this.filmService.listeGenre();
  }

  ajouterGenre(nouveauGenre: Genre): void {
    this.filmService.ajouterGenre(nouveauGenre);
    this.chargerGenre();
  }

  nutritionalGenre(nt: Genre): void {
    if (this.ajout) {
      this.ajouterGenre(nt);
    } else {
      const index = this.genres.findIndex((genre) => genre.idGen === nt.idGen);
      if (index !== -1) {
        this.genres[index] = nt;
      }
      this.ajout = true;
    }
    this.updatedGenre = { idGen: 0, nomGen: '' };
  }

  genreUpdated(nt: Genre): void {
    this.updatedGenre = { ...nt };
    this.ajout = false;
  }
}

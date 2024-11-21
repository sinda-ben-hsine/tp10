import { Injectable } from '@angular/core';
import { films } from '../model/film.model';
import { Genre } from '../model/genre.model';

@Injectable({
  providedIn: 'root',
})
export class FilmService {

  films: films[];
  film!: films;
  genres: { idGen: number; nomGen: string; }[];
  filmsRecherche!: films[];

  constructor() {
    this.genres = [
      { idGen: 1, nomGen: 'Action' },
      { idGen: 2, nomGen: 'Romantique' },
    ];

    this.films = [
      {
        idFilm: 1,
        nomFilm: 'Harry Potter',
        dureeFilm: 159,
        dateSortir: new Date('2001-01-16'),
        genre: { idGen: 1, nomGen: 'Action' },
      },
      {
        idFilm: 2,
        nomFilm: 'Sous la seine',
        dureeFilm: 101,
        dateSortir: new Date('2024-06-05'),
        genre: { idGen: 2, nomGen: 'Romantique' },
      },
    ];
  }

  listeFilms(): films[] {
    return this.films;
  }

  ajouterFilm(film: films) {

    if (!film.idFilm) {
      const maxId = this.films.reduce((max, item) => (item.idFilm && item.idFilm > max ? item.idFilm : max), 0);
      film.idFilm = maxId + 1;
    }
    this.films.push(film);
  }

  supprimerFilm(fi: films) {
    const index = this.films.indexOf(fi, 0);
    if (index > -1) {
      this.films.splice(index, 1);
    }

  }
  consulterFilm(id: number): films {
    this.film = this.films.find( f=> f.idFilm == id)!;
    return this.film;
  }

  trierFilms() {
    this.films = this.films.sort((n1, n2) => {
      if (n1.idFilm! > n2.idFilm!) {
        return 1;
      }
      if (n1.idFilm! < n2.idFilm!) {
        return -1;
      }
      return 0;
    });
  }
  updateFilm(f: films) {
    this.supprimerFilm(f);
    this.ajouterFilm(f);
    this.trierFilms();
  }
  listeGenre(): Genre[] {
    return this.genres;
  }
  consulterGenre(id: number): Genre {
    return this.genres.find(cat => cat.idGen == id)!;
  }
  /* rechercherParGenre(idNut: number): films[] {
    this.filmsRecherche = []
    this.films.forEach((cur, index) => {
      if (idNut == cur.genre.idGen) {
        console.log("cur " + cur);
        this.filmsRecherche.push(cur);
      }
    });
    return this.filmsRecherche;
  }

  rechercherParNom(nom: string): films[] {
    return this.films.filter(fi =>
    fi.nomFilm && fi.nomFilm.toLowerCase().includes(nom.toLowerCase())
    );

  } */
  ajouterGenre(ge: Genre): Genre {
    const id = this.genres.length > 0 
      ? Math.max(...this.genres.map(genre => genre.idGen ?? 0)) + 1 
      : 1;
      
    ge.idGen = id;
    this.genres.push(ge);
    return ge;
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilmService } from '../services/film.service';
import { Genre } from '../model/genre.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { films } from '../model/film.model';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
})
export class AddFilmComponent implements OnInit {
  genres!: Genre[];
  addFilmForm!: FormGroup; 


  constructor(
    private filmService: FilmService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.genres = this.filmService.listeGenre();
    
    this.addFilmForm = this.fb.group({
      idFilm: ['', [Validators.required]],
      nomFilm: ['', [Validators.required, Validators.minLength(1)]],
      dureeFilm: ['', [Validators.required, Validators.min(1)]],
      dateSortir: ['', [Validators.required]],
      idGen: ['', [Validators.required]]
    });
  }

  addFilm(): void {
    if (this.addFilmForm.invalid) {
      return;
    }

    const newFilm = new films();
    newFilm.idFilm = this.addFilmForm.get('idFilm')?.value;
    newFilm.nomFilm = this.addFilmForm.get('nomFilm')?.value;
    newFilm.dureeFilm = this.addFilmForm.get('dureeFilm')?.value;
    newFilm.dateSortir = this.addFilmForm.get('dateSortir')?.value;
    
   newFilm.genre= this.filmService.consulterGenre(this.addFilmForm.get('idGen')?.value);

    // Ajouter le film et rediriger
    const newFilmId = this.filmService.ajouterFilm(newFilm);
    this.router.navigate(['films']);
  }
}

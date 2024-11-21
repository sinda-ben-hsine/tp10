import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmService } from '../services/film.service';
import { films } from '../model/film.model';
import { Genre } from '../model/genre.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-film',
  templateUrl: './update-film.component.html',
})
export class UpdateFilmComponent implements OnInit {
  genres!: Genre[];
  updatedGenId!: number;
  currentFilm = new films();
  filmForm!: FormGroup; 

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private filmService: FilmService,
    private fb: FormBuilder 
  ) { }

  ngOnInit() {
    this.genres = this.filmService.listeGenre();
    this.currentFilm = this.filmService.consulterFilm(this.activatedRoute.snapshot.params['id']);
    this.updatedGenId = this.currentFilm.genre.idGen;

    this.filmForm = this.fb.group({
      idFilm: [{ value: this.currentFilm.idFilm, disabled: true }],
      nomFilm: [this.currentFilm.nomFilm, [Validators.required, Validators.minLength(3)]],
      dureeFilm: [this.currentFilm.dureeFilm, [Validators.required, Validators.min(1)]],
      dateSortir: [this.currentFilm.dateSortir, [Validators.required]],
      genre: [this.currentFilm.genre.idGen, [Validators.required]],
    });
  }



  updateFilm() {
    if (this.filmForm.invalid) {
      return; 
    }
    
    // Update currentFilm with form values
    this.currentFilm.nomFilm = this.filmForm.value.nomFilm;
    this.currentFilm.dureeFilm = this.filmForm.value.dureeFilm;
    this.currentFilm.dateSortir = this.filmForm.value.dateSortir;
    this.currentFilm.genre = this.filmService.consulterGenre(this.filmForm.value.genre);
  
    // Call the service to update the film
    this.filmService.updateFilm(this.currentFilm);
  
    // Navigate back to the film list
    this.router.navigate(['films']);
  }
  
}

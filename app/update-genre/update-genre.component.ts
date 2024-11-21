import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-update-genre',
  templateUrl: './update-genre.component.html',
  styles: []
})
export class UpdateGenreComponent implements OnInit {
  @Input() genre!: Genre;
  @Input() ajout!: boolean;
  @Output() genreUpdated = new EventEmitter<Genre>();

  ngOnInit(): void {}

  saveGenre(): void {
    if (!this.genre.nomGen || this.genre.nomGen.trim() === '') {
      alert('Nom Genre cannot be empty');
      return;
    }
    this.genreUpdated.emit(this.genre);
  }
}

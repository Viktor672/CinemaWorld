import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../../models';
import { CommonModule, DatePipe } from '@angular/common';
import { LimitTextPipe } from '../../../shared/pipes/limit-text.pipe';

@Component({
  selector: 'app-movie-item',
  imports: [CommonModule, RouterLink, DatePipe, LimitTextPipe],
  templateUrl: './movie-item.html',
  styleUrl: './movie-item.css'
})
export class MovieItem {
  @Input() movie!: Movie;

  constructor() { }

  get backgroundImgStyle(): {} {
    return {
      'background-image': `url(${this.movie?.imageUrl})`,
      'background-size': 'cover',
      'background-position': 'center'
    }
  }
}

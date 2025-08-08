import { AfterViewInit, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-item',
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-item.html',
  styleUrl: './movie-item.css'
})
export class MovieItem {
  @Input() movie!: Movie;
  
  constructor() { 
  console.log(this.movie);
}

  get backgroundImgStyle(): { } {
    return {
      'background-image': `url(${this.movie?.imageUrl})`,
      'background-size': 'cover',
      'background-position': 'center'
    }
  }
}

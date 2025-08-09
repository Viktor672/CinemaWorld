import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../../models';
import { MovieService } from '../../../core/services/movie.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AutoPlayVideo } from '../../../directives/autoplay/auto-play-video.directive';
import { MovieItem } from '../movie-item/movie-item';

@Component({
  selector: 'app-movie-board',
  imports: [MovieItem, CommonModule, AutoPlayVideo],
  templateUrl: './movie-board.html',
  styleUrl: './movie-board.css'
})
export class MovieBoard implements OnInit, OnDestroy {
  public movies: Movie[] = [];
  private subscriptions: Subscription[] = [];
  constructor(private movieService: MovieService) { }
  
  ngOnInit(): void {
    this.subscriptions.push(this.movieService.getMovies().subscribe((response: Movie[]) => {
      this.movies = response;
      console.log(this.movies);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}

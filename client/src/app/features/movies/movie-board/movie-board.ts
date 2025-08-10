import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
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
  public filteredMovies: Movie[] = [];
  private subscriptions: Subscription[] = [];
  constructor(private movieService: MovieService) { }

  public searchHandler(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    console.log(searchTerm);

    let resultMovies = this.movies.filter((movie: Movie) => {
      return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    this.filteredMovies = resultMovies;
  }

  ngOnInit(): void {
    this.subscriptions.push(this.movieService.getMovies().subscribe((response: Movie[]) => {
      this.movies = response;
      this.filteredMovies = this.movies;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}

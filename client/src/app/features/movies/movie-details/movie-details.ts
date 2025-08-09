import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../../models';
import { Subscription } from 'rxjs';
import { MovieService } from '../../../core/services/movie.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails implements OnInit, OnDestroy {
  public activeRoute = inject(ActivatedRoute);
  public movieService = inject(MovieService);

  public movie: Movie | null = null;
  public id: string | null = this.activeRoute.snapshot.paramMap.get('id');
  private subscriptions: Subscription[] = [];

  constructor() { }

  get backgroundImageStyle(): {} {
    return {
      backgroundImage: `url(${this.movie?.imageUrl})`
    }
  }

  ngOnInit(): void {
    this.subscriptions.push(this.movieService.getMovie(this.id).subscribe((response: Movie) => {
      this.movie = response;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}

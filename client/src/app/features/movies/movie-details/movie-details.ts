import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../../models';
import { Subscription } from 'rxjs';
import { MovieService } from '../../../core/services/movie.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails implements OnInit, OnDestroy {
  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);
  public movieService = inject(MovieService);
  public authService = inject(AuthService);

  public movie: Movie | null = null;
  public id: string | null = this.activeRoute.snapshot.paramMap.get('id');
  private subscriptions: Subscription[] = [];
  private currentUser = this.authService.currentUser();
  public isOwner: boolean = false;

  constructor() {

  }

  get backgroundImageStyle(): {} {
    return {
      backgroundImage: `url(${this.movie?.imageUrl})`
    }
  }

  public deleteHandler(): void {
    this.subscriptions.push(this.movieService.deleteMovie(this.id).subscribe());
    this.router.navigateByUrl('/movies');
  }

  ngOnInit(): void {
    this.subscriptions.push(this.movieService.getMovie(this.id).subscribe((response: Movie) => {
      this.movie = response;
      this.isOwner = this.currentUser?._id === this.movie?._ownerId;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}

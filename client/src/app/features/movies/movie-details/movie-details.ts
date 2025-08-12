import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Movie } from '../../../models';
import { Subscription } from 'rxjs';
import { MovieService } from '../../../core/services/movie.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails implements OnInit, OnDestroy, AfterViewInit {
  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private movieService = inject(MovieService);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  public movie: Movie | null = null;
  public movieId: string | null = this.activeRoute.snapshot.paramMap.get('id');
  readonly currentUser = this.authService.currentUser;
  public ownerId: string | null = '';
  public id: string | undefined = '';
  private subscriptions: Subscription[] = [];
  public isOwner: boolean = false;
  public hasLiked: WritableSignal<boolean> = signal(Boolean(localStorage.getItem(`liked_${this.movieId}_${this.currentUser()?._id}`)));
  public likesCounter: WritableSignal<number> = signal(0);

  constructor() { }

  get backgroundImageStyle(): {} {
    return {
      backgroundImage: `url(${this.movie?.imageUrl})`
    }
  }

  public deleteHandler(): void {
    let hasConfirmed = globalThis.confirm(`Are you sure you want to delete ${this.movie?.title}?`);

    if (!hasConfirmed) {
      this.router.createUrlTree(['/movies', this.movieId]);
    }
    else {
      this.subscriptions.push(this.movieService.deleteMovie(this.movieId).subscribe(() => {
        this.router.navigateByUrl('/movies');
      }));
    }
  }

  public likeHandler(): void {
    this.subscriptions.push(this.userService.like(this.ownerId, this.movieId).subscribe());

    localStorage.setItem(`liked_${this.movieId}_${this.currentUser()?._id}`, 'true');
    this.likesCounter.set(this.likesCounter() + 1);
    this.hasLiked.set(true)
  }

  ngOnInit(): void {
    this.id = this.currentUser()?._id;

    this.subscriptions.push(this.movieService.getMovie(this.movieId).subscribe((response: Movie) => {
      this.movie = response;
      this.ownerId = this.movie?._ownerId;

      this.isOwner = this.currentUser()?._id === this.ownerId;
    }));

    this.subscriptions.push(this.userService.getLikes(this.movieId).subscribe((response: number) => {
      this.likesCounter.set(response);
    }));
  }

  ngAfterViewInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      if (params['alert'] === 'movie-owner') {
        alert('You are not the owner of this movie!');
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}

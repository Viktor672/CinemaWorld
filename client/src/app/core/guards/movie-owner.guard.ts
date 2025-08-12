import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { MovieService } from "../services/movie.service";
import { Movie } from "../../models";
import { catchError, map, of, take } from "rxjs";

export const movieOwnerGuard: CanActivateFn = (route) => {
    let router = inject(Router);
    let movieId = route.paramMap.get('id');
    let authService = inject(AuthService);
    let movieService = inject(MovieService);

    return movieService.getMovie(movieId).pipe(take(1), map((movie: Movie) => {
        if (movie._ownerId === authService.currentUser()?._id) {
            return true;
        }
        else {
            return router?.createUrlTree(['/movies', movieId], {
                queryParams: { alert: 'movie-owner' }
            });
        }
    }),
        catchError(() => {
            return of(router?.createUrlTree(['/page-not-found'], {
                queryParams: { alert: 'movie-owner' }
            }));
        })
    );
}
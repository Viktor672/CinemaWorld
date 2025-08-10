import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { MovieService } from "../services/movie.service";
import { Movie } from "../../models";
import { map, of, take } from "rxjs";

export const movieOwnerGuard: CanActivateFn = (route) => {
    let router = inject(Router);
    let movieId = route.paramMap.get('id');
    let authService = inject(AuthService);
    let movieService = inject(MovieService);


    if (Boolean(movieId)) {
        return movieService.getMovie(movieId).pipe(take(1), map((movie: Movie) => {
            if (movie._ownerId === authService.currentUser()?._id) {
                return true;
            }
            else {
                return router.createUrlTree(['/movies', movieId]);
            }
        }));
    }

    return of(router.createUrlTree(['/movies', movieId]));
}
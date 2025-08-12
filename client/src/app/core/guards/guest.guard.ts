import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const guestGuard: CanActivateFn = () => {
    let router = inject(Router);
    let authService = inject(AuthService);

    if (Boolean(!authService.currentUser()?._id)) {
        return true;
    }
    else {
        return router.createUrlTree(['/home'], {
            queryParams: { alert: 'guest' }
        });
    }
}
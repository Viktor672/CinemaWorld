import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = () => {
    let router = inject(Router);
    let authService = inject(AuthService);

    if (Boolean(authService.currentUser())) {
        return true;
    }
    else {
        return router.createUrlTree(['/login'], {
            queryParams: { alert: 'auth' }  
        });
    }
}
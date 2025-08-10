import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = () => {
    let router = inject(Router);
    let authService = inject(AuthService);

    return Boolean(authService.currentUser()) ? true : router.navigateByUrl('/login');
}
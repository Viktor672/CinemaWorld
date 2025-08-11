import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const guestGuard: CanActivateFn = () => {
    let router = inject(Router);
    let authService = inject(AuthService);

    return Boolean(!authService.currentUser()?._id) ? true : router.navigateByUrl('/home');
}
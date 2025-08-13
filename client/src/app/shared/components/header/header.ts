import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  readonly currentUser = this.authService.currentUser;

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
    this.toast.show('Successful Logout!', 'success');
  }
}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-page-not-found',
  imports: [RouterLink],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css'
})
export class PageNotFound implements AfterViewInit {
  constructor(private activeRoute: ActivatedRoute, private toast: ToastService) { }

  ngAfterViewInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      if (params['alert'] === 'movie-owner') {
        alert('This movie does not exist');
        this.toast.show('Page not found!', 'error');
      }
    });
  }
}

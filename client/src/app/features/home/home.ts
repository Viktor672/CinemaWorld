import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AutoPlayVideo } from '../../directives/autoplay/auto-play-video.directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, AutoPlayVideo],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit {
  constructor(private activeRoute: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      if (params['alert'] === 'guest') {
        alert('You are already logged in!');
      }
    });
  }
}
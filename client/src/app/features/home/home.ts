import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AutoPlayVideo } from '../../directives/autoplay/auto-play-video.directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, AutoPlayVideo],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}
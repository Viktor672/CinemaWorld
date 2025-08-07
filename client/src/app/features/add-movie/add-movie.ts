import { Component } from '@angular/core';
import { AutoPlayVideo } from '../../directives/autoplay/auto-play-video.directive';

@Component({
  selector: 'app-add-movie',
  imports: [AutoPlayVideo],
  templateUrl: './add-movie.html',
  styleUrl: './add-movie.css'
})
export class AddMovie {

}

import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAutoPlayVideo]',
})
export class AutoPlayVideo implements AfterViewInit {
  private video!: HTMLVideoElement;

  constructor(private el: ElementRef<HTMLVideoElement>) {
  }

  ngAfterViewInit(): void {
    this.enableAutoplay();
  }

  private enableAutoplay(): void {
    this.video = this.el.nativeElement;

    this.video.muted = true;

    this.video.play().catch(err => {
      alert('Unable to load background video.');
    });
  }
}
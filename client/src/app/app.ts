import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer, Header } from './shared/components';
import { Home } from './features/home/home';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('client');
  baseUrl: string = 'http://localhost:3030';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get(`${this.baseUrl}/data/movies`).subscribe(data => {
      console.log(data);
    });
  }
}

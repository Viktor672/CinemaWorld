import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../models';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  public user: User | null = null;
  private subscriptions: Subscription[] = []

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.userService.getUser().subscribe((response: User) => {
      this.user = response;
    }));
  }
}
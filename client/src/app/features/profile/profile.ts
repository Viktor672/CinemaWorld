import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../models';
import { Subscription } from 'rxjs';
import { LimitTextPipe } from '../../shared/pipes/limit-text.pipe';

@Component({
  selector: 'app-profile',
  imports: [LimitTextPipe],
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
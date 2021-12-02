import {Component} from '@angular/core';
import {AuthService} from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {title: 'Inbox', url: '/folder/Inbox', icon: 'mail'},
    {title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane'},
    {title: 'Favorites', url: '/folder/Favorites', icon: 'heart'},
    {title: 'Archived', url: '/folder/Archived', icon: 'archive'},
    {title: 'Trash', url: '/folder/Trash', icon: 'trash'},
    {title: 'Spam', url: '/folder/Spam', icon: 'warning'},
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private authService: AuthService) {
  }

  /**
   * check, if the user is logged in.
   *
   * @return true, if the user is logged in
   */
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

}

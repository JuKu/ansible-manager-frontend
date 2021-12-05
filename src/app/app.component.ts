import {Component} from '@angular/core';
import {AuthService} from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {title: 'Execution', url: '/folder/Inbox', icon: 'chevron-forward-circle', permissions: [], subPages: [
      //
      ]},
    {title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane', permissions: []},
    {title: 'Favorites', url: '/folder/Favorites', icon: 'heart', permissions: []},
    {title: 'Archived', url: '/folder/Archived', icon: 'archive', permissions: []},
    {title: 'Trash', url: '/folder/Trash', icon: 'trash', permissions: []},
    {title: 'Administration', url: '/admin/home', icon: 'construct', permissions: []},
    {title: 'Logout', url: '/logout', icon: 'log-out', permissions: []},
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders']

  private constructedPages = [];

  constructor(private authService: AuthService) {
    this.constructPages();
  }

  /**
   * computes the correct pages list.
   */
  private constructPages() {
    this.constructedPages = [];

    this.appPages.forEach((page) => {
      //check permissions
      if (this.hasPagePermission(page)) {
        this.constructedPages.push(page);
      }
    });
  }

  private hasPagePermission(page: any): boolean {
    if (page.permissions.length === 0) {
      return true;
    } else {
      //check, if the user has minimum one of this permissions
      page.permissions.forEach(permission => {
        if (this.authService.getPermissionService().hasPermission(permission)) {
          return true;
        }
      });

      //if the page has subpages, also check for this
      if (page.hasOwnProperty('subPages')) {
        page.subPages.forEach(subPage => {
          if (this.hasPagePermission(subPage)) {
            return true;
          }
        });
      }

      return false;
    }
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

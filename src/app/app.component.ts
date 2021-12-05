import {Component} from '@angular/core';
import {AuthService} from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {title: 'Dashboard', url: '/dashboard/overview', icon: 'server', permissions: [], show: false},
    {
      title: 'Execution', url: '/execution/overview', icon: 'chevron-forward-circle', permissions: [], show: false,
      subPages: [
        {title: 'Dashboard', url: '/folder/Outbox', icon: 'server', permissions: []},
        {title: 'Jobs', url: '/folder/Outbox', icon: 'server', permissions: []},
        {title: 'Scheduler', url: '/folder/Outbox', icon: 'server', permissions: []},
      ]
    },
    {title: 'Server', url: '/folder/Outbox', icon: 'server', permissions: [], show: false},
    {title: 'Templates', url: '/folder/Favorites', icon: 'book', permissions: [], show: false},
    {title: 'Projects', url: '/folder/Archived', icon: 'newspaper', permissions: [], show: false},
    {title: 'Teams', url: '/folder/Archived1', icon: 'people', permissions: [], show: false},
    {title: 'Repositories', url: '/folder/Trash', icon: 'code-slash', permissions: [], show: false},
    {title: 'Administration', url: '/admin/home', icon: 'construct', permissions: [], show: false},
    {title: 'Logout', url: '/logout', icon: 'log-out', permissions: [], show: false},
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  private constructedPages = [];

  constructor(private authService: AuthService) {
    this.constructPages();
  }

  /**
   * check, if the user is logged in.
   *
   * @return true, if the user is logged in
   */
  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
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

}

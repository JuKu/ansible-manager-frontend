import {Component} from '@angular/core';
import {AuthService} from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {title: 'Dashboard', url: '/dashboard/overview', icon: 'analytics', permissions: [], show: false},
    {
      title: 'Execution', url: '/execution/overview', icon: 'chevron-forward-circle', permissions: [], show: false,
      subPages: [
        {title: 'Dashboard', url: '/folder/Outbox1', icon: 'server', permissions: []},
        {title: 'Jobs', url: '/folder/Outbox2', icon: 'server', permissions: []},
        {title: 'Scheduler', url: '/folder/Outbox3', icon: 'server', permissions: []},
      ]
    },
    {title: 'Server', url: '/folder/Outbox', icon: 'server', permissions: [], show: false},
    {title: 'Templates', url: '/folder/Favorites', icon: 'book', permissions: [], show: false},
    {title: 'Projects', url: '/folder/Archived', icon: 'newspaper', permissions: [], show: false},
    {title: 'Teams', url: '/folder/Archived1', icon: 'people', permissions: [], show: false},
    {title: 'Credentials', url: '/credentials', icon: 'key', permissions: [], show: false},
    {title: 'Repositories', url: '/folder/Trash', icon: 'code-slash', permissions: [], show: false},
    {title: 'Administration', url: '/admin/home', icon: 'construct', permissions: [], show: false},
    {title: 'Logout', url: '/logout', icon: 'log-out', permissions: [], show: false},
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructedPages = [];

  constructor(private authService: AuthService) {
    this.constructPages(this.appPages);
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
   * This method is used by the menu to set the correct right icon.
   */
  public getDropdownMenuIconName(page: any) {
    return page.show ? 'chevron-down-circle' : '';
  }

  public hasSubPages(page: any) {
    return page.hasOwnProperty('subPages') && page.subPages.length > 0;
  }

  public toggleSubMenu(page: any) {
    //first, close all other submenus
    this.constructedPages.forEach(p => p.show = false);

    //choose the correct submenu and show
    this.constructedPages
      .filter(p => p.title === page.title && p.url === page.url)
      .forEach(p => p.show = !p.show);
  }

  /**
   * computes the correct pages list.
   */
  public constructPages(pages: Array<any>) {
    this.constructedPages = [];

    pages.forEach((page) => {
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

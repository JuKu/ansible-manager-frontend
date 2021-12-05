import { Injectable } from '@angular/core';

/**
 * This service is responsible for getting the roles and permissions from the server and to return them
 * to the other services.
 *
 * @author Justin Kuenzel
 */
@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  /**
   * the list of all roles, which the user has.
   */
  private roles: Array<string>;

  /**
   * the list of all permissions, which the user has.
   */
  private permissions: Array<string>;

  constructor() {
    this.roles = new Array<string>();
  }

  public getRoles(): Array<string> {
    return this.roles;
  }

  public hasPermission(requestedPermission: string): boolean {
    return this.permissions.indexOf(requestedPermission) > 0;
  }

  /**
   * load all roles of the current user from the server.
   */
  public loadPermissions(): void {
    //
  }

  /**
   * remove all permissions of the user.
   */
  public cleanUp(): void {
    //create a new list
    this.roles = new Array<string>();
  }

}

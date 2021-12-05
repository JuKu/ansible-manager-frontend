import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import {RouterTestingModule} from '@angular/router/testing';

import {AppComponent} from './app.component';

//see also: https://stackoverflow.com/questions/47236963/no-provider-for-httpclient
// Http testing module and mocking controller
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {By} from '@angular/platform-browser';

// Other imports

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
    }).compileComponents();
  }));

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app, 'isLoggedIn').and.returnValue(true);
    expect(app).toBeTruthy();
  }));

  /*it('should have menu labels', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-label');
    expect(menuItems.length).toEqual(12);
    expect(menuItems[0].textContent).toContain('Inbox');
    expect(menuItems[1].textContent).toContain('Outbox');
  }));*/

  it('should have urls', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;

    // login user
    spyOn(fixture.debugElement.componentInstance, 'isLoggedIn').and.returnValue(true);
    fixture.detectChanges();

    const menuItems = app.querySelectorAll('ion-item');
    expect(menuItems.length).toEqual(9);
    expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual('/dashboard/overview');
    //expect(menuItems[1].getAttribute('ng-reflect-router-link')).toEqual('/execution/overview');
  }));

  it('should get the correct submenu class', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    expect(app.getDropdownMenuIconName({show: false})).not.toBeNull();
    expect(app.getDropdownMenuIconName({show: false})).toBeDefined();
    expect(app.getDropdownMenuIconName({show: true})).toBe('chevron-down-circle');
  });

  it('should be able to toggle the menu', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    const compiled = fixture.debugElement.nativeElement;

    //show the first menu
    app.toggleSubMenu(app.appPages[0]);
    tick();
    fixture.detectChanges();

    //there should be only one selected element
    expect(fixture.debugElement.queryAll(By.css('.selected')).length).toBe(1);

    //click the second menu entry
    const menus = compiled.querySelectorAll('ion-item');
    //console.log(menus);
    menus[1].click();
    tick();
    fixture.detectChanges();

    //there should be only one selected element
    expect(fixture.debugElement.queryAll(By.css('.selected')).length).toBe(1);

    //verify, that all other menus are not selected
    const menuEntries = fixture.debugElement.queryAll(By.css('ion-item'));
    expect(menuEntries.length > 0).toBeTrue();

    menuEntries.forEach((menuEntry: DebugElement) => {
      expect(menuEntry).toBeTruthy();
      console.log(menuEntry.classes);
      //expect(menuEntry.classes.hasOwnProperty('selected')).toBeTrue();

      //menuEntry.nativeElement
    });
  }));

});

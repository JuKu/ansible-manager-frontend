import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {LoginComponent} from './login.component';
import {CommonModule} from '@angular/common';
import {AppModule} from '../../../app.module';
import {By} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        //CommonModule,
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot([])/*,
        AppModule*/
      ],
      providers: [
        {provide: FormBuilder, useValue: formBuilder}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    /*
    * pass in the form dynamically.
    * See also: https://stackoverflow.com/questions/48670402/karma-formgroup-expects-a-formgroup-instance-please-pass-one-in
    */
    component.signinForm = formBuilder.group({
      username: null,
      password: null
    });

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be close its warnings', () => {
    component.closeWarning();
    expect(component.showWarning).toBeFalse();
  });

  it('should be able to present a toast', () => {
    component.presentLoginToast('test');
    expect(component.toastController).toBeTruthy();
  });

  it('should login', () => {
    //first, set the username and password
    component.signinForm.setValue({username: 'user1234', password: 'password1234'});
    expect(component.signinForm.get('username').value).toBe('user1234');

    const spy = spyOn(component, 'presentLoginToast');

    component.loginUser();

    //check, if the presentLoginToast() method was called
    expect(spy).toHaveBeenCalled();

    //login button should reset the form fields
    expect(component.signinForm.get('password').value).toBe('');
    //TODO: add code here
  });

  it('should contain an input field for username and password', () => {
    const fields = fixture.debugElement.queryAll(By.css('ion-input'));
    expect(fields[0]).toBeTruthy();
    expect(fields[1]).toBeTruthy();
    expect(fields.length).toEqual(2);
  });

  it('should not show warning before login', () => {
    component.showWarning = false;

    // update the UI
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('#login_warning'));
    expect(element).not.toBeTruthy();

    //show warning
    component.showWarning = true;

    // update the UI
    fixture.detectChanges();

    const element1 = fixture.debugElement.query(By.css('#login_warning'));
    expect(element1).toBeTruthy();

    //close warning
    component.closeWarning();

    // update the UI
    fixture.detectChanges();

    const element2 = fixture.debugElement.query(By.css('#login_warning'));
    expect(element2).not.toBeTruthy();
  });
});

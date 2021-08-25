import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginComponent } from './login.component';
import {CommonModule} from '@angular/common';
import {AppModule} from '../../../app.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        CommonModule,
        IonicModule.forRoot(),
        ReactiveFormsModule,
        AppModule
      ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder }
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
});

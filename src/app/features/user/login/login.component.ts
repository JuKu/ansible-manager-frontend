import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {AuthService} from '../../../core/auth/auth.service';
import {AuthResult} from '../../../core/auth/auth-result';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  title = 'Login';
  signinForm: FormGroup;
  showWarning = false;

  constructor(public fb: FormBuilder,
              public authService: AuthService,
              public toastController: ToastController,
              public router: Router) {
    this.signinForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    // no component initialization neccessary here
  }

  loginUser() {
    console.log('username: ' + this.signinForm.get('username').value);

    this.presentLoginToast('try to login...');
    this.authService.login(this.signinForm.value).subscribe((res: AuthResult) => {
      if (res.success) {
        this.router.navigate(['']);
      } else {
        this.showWarning = true;
      }
    });

    //reset password value after login process
    this.signinForm.get('password').setValue('');
  }

  closeWarning(): void {
    this.showWarning = false;
  }

  async presentLoginToast(message1: string) {
    const toast = await this.toastController.create({
      message: message1,
      duration: 1000
    });
    toast.present();
  }

}

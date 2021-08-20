import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

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
              /*public authService: AuthService,*/
              public toastController: ToastController,
              public router: Router) {
    this.signinForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit() {
    // no component initialization neccessary here
  }

  loginUser() {
    this.presentLoginToast('try to login...');
    /*this.authService.login(this.signinForm.value).subscribe((res: AuthResult) => {
      if (res.success) {
        this.router.navigate(['']);
      } else {
        this.showWarning = true;
      }
    });*/
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

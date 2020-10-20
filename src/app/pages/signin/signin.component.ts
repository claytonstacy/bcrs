import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form: FormGroup;
  error: string;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      userId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    })
  }


  login() {
    const userId = this.form.controls['userId'].value;
      if(userId > 999 && userId < 1013) {
        this.cookieService.set('session_user', userId, 1);
        this.router.navigate(['/'])
      } else {
        this.error = 'The employee ID you entered was invalid.  Please try again';
      }
  }
}

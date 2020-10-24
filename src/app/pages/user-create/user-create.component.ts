/******************************************************************************
 * Title: user-create.component.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 10/23/2020
 * Description: user create component
 *****************************************************************************/

import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../shared/user.service';
import {User} from '../../shared/user.interface';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})

export class UserCreateComponent implements OnInit {
  user: any;
  userId: string;
  form: FormGroup;
  roles: any;

  constructor(private http: HttpClient, private fb: FormBuilder,
              private router: Router, private userService: UserService) {
  }

  /******************************************************************************
   * On initialization, this component creates a single form group with several
   * controls. Validators.required indicates that the field must have a non-empty
   * value before it can be submitted.
   *****************************************************************************/
  ngOnInit(): void {
    const phonePattern = new RegExp('^\d{10}$');

    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required,
        Validators.minLength(3)])],

      password: [null, Validators.compose([Validators.required,
        Validators.minLength(8)])],

      firstName: [null, Validators.compose([Validators.required])],

      lastName: [null, Validators.compose([Validators.required])],

      phoneNumber: [null, Validators.compose([Validators.required,
        Validators.pattern(phonePattern)])],

      address: [null, Validators.compose([Validators.required])],

      email: [null, Validators.compose([Validators.required,
        Validators.email])]
    });
  }

  createUser(): void {
    // The 'as' keyword tells TypeScript to ignore type inference and consider,
    // in this case, an empty object named 'newUser' as an object of type User
    const newUser = {} as User;
    newUser.userName = this.form.controls.userName.value;
    newUser.password = this.form.controls.password.value;
    newUser.firstName = this.form.controls.firstName.value;
    newUser.lastName = this.form.controls.lastName.value;
    newUser.phoneNumber = this.form.controls.phoneNumber.value;
    newUser.address = this.form.controls.address.value;
    newUser.email = this.form.controls.email.value;

    this.userService.createUser(newUser).subscribe(() => {
      this.router.navigate(['/users']);
    }, err => {
      console.log(err);
    });
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }

}

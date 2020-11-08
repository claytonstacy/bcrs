/******************************************************************************
 * Title: user-details.component.ts
 * Author: Jeff Shepherd, Clayton Stacy
 * Modified by:
 * Date: 10/23/2020
 * Description: user create component
 *****************************************************************************/

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from 'src/app/shared/interfaces/user.interface';
import {UserService} from 'src/app/shared/services/user.service';
import {RoleService} from 'src/app/shared/services/role.service';
import {Role} from 'src/app/shared/interfaces/role.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  userId: string;
  form: FormGroup;
  roles: Role[];

  constructor(private route: ActivatedRoute, private fb: FormBuilder,
              private router: Router, private userService: UserService,
              private roleService: RoleService) {

    this.userId = this.route.snapshot.paramMap.get('userId');

    this.userService.findUserById(this.userId).subscribe(res => {
      this.user = res.data;
    }, err => {
      console.log(err);
    }, () => {
      this.form.controls.firstName.setValue(this.user.firstName);
      this.form.controls.lastName.setValue(this.user.lastName);
      this.form.controls.phoneNumber.setValue(this.user.phoneNumber);
      this.form.controls.address.setValue(this.user.address);
      this.form.controls.email.setValue(this.user.email);
      if (this.user.role) this.form.controls.role.setValue(this.user.role['role']);
    });
    this.roleService.findAllRoles().subscribe(res => {
      console.log('Here are the roles',res.data)
      this.roles = res['data'];
    }, err => {
      console.log(err);
    })

  }

  ngOnInit(): void {
    // any number of numbers between 0-9
    const numberPattern = '^[0-9]*$';

    this.form = this.fb.group({
      firstName: [null, Validators.compose([Validators.required])],

      lastName: [null, Validators.compose([Validators.required])],

      phoneNumber: [null, Validators.compose([Validators.required,
        Validators.pattern(numberPattern), Validators.minLength(10),
        Validators.maxLength(10)])],

      address: [null, Validators.compose([Validators.required])],

      email: [null, Validators.compose([Validators.required,
        Validators.email])],

      role: [null]
    });
  }

  saveUser(): void {
    // The 'as' keyword tells TypeScript to ignore type inference and consider,
    // in this case, an empty object named 'newUser' as an object of type User
    const updatedUser = {} as User;

    updatedUser.firstName = this.form.controls.firstName.value;
    updatedUser.lastName = this.form.controls.lastName.value;
    updatedUser.phoneNumber = this.form.controls.phoneNumber.value;
    updatedUser.address = this.form.controls.address.value;
    updatedUser.email = this.form.controls.email.value;
    updatedUser.role = this.form.controls.role.value;

    this.userService.updateUser(this.userId, updatedUser).subscribe(() => {
      this.router.navigate(['/users']);
    }, err => {
      console.log(err);
    });
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}

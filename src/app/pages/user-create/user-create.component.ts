/******************************************************************************
 * Title: user-create.component.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 10/23/2020
 * Description: user create component
 *****************************************************************************/

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../shared/user.service';
import {User} from '../../shared/user.interface';
import {SecurityQuestion} from '../../shared/security-question.interface';
import {SecurityQuestionService} from '../../shared/security-question.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})

export class UserCreateComponent implements OnInit {
  user: User;
  userId: string;
  form: FormGroup;
  roles: any;
  securityQuestionOptions: SecurityQuestion[];

  constructor(private fb: FormBuilder, private router: Router,
              private userService: UserService,
              private securityQuestionService: SecurityQuestionService) {

    this.securityQuestionService.findAllSecurityQuestions().subscribe(res => {
      this.securityQuestionOptions = res.data;
      console.log('These are the security questions',
        JSON.stringify(this.securityQuestionOptions));
    }, err => {
      console.log(err);
    });
  }

  /******************************************************************************
   * On initialization, this component creates a single form group with several
   * controls. Validators.required indicates that the field must have a non-empty
   * value before it can be submitted.
   *****************************************************************************/
  ngOnInit(): void {
    // any number of numbers between 0-9
    const numberPattern = '^[0-9]*$';
    // at least one number, at least one upper case letter, and length 8+
    const passwordPattern = '^(?=.+[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$';

    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required,
        Validators.minLength(3)])],

      password: [null, Validators.compose([Validators.required,
        Validators.pattern(passwordPattern)])],

      firstName: [null, Validators.compose([Validators.required])],

      lastName: [null, Validators.compose([Validators.required])],

      phoneNumber: [null, Validators.compose([Validators.required,
        Validators.pattern(numberPattern),
        Validators.minLength(10), Validators.maxLength(10)])],

      address: [null, Validators.compose([Validators.required])],

      email: [null, Validators.compose([Validators.required,
        Validators.email])],

      selectedQuestion1: [null, Validators.compose([Validators.required])],

      selectedQuestion2: [null, Validators.compose([Validators.required])],

      selectedQuestion3: [null, Validators.compose([Validators.required])],

      securityQuestionAnswer1: [null, Validators.compose([Validators.required])],

      securityQuestionAnswer2: [null, Validators.compose([Validators.required])],

      securityQuestionAnswer3: [null, Validators.compose([Validators.required])]

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

    newUser.securityQuestions = [
      {
        questionText: this.form.controls.selectedQuestion1.value,
        answerText: this.form.controls.securityQuestionAnswer1.value
      },

      {
        questionText: this.form.controls.selectedQuestion2.value,
        answerText: this.form.controls.securityQuestionAnswer2.value
      },

      {
        questionText: this.form.controls.selectedQuestion3.value,
        answerText: this.form.controls.securityQuestionAnswer3.value
      }];

    this.userService.createUser(newUser).subscribe(() => {
      console.log('Adding this user', JSON.stringify(newUser));
      this.router.navigate(['/users']);
    }, err => {
      console.log(err);
    });
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}

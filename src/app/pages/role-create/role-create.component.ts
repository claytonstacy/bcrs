/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd
Date: 20 Oct 2020
Description: Role create component
============================================
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RoleService } from '../../shared/role.service';
import { Role } from '../../shared/role.interface';

@Component({
	selector: 'app-role-create',
	templateUrl: './role-create.component.html',
	styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {
  form: FormGroup;

	constructor(private roleService: RoleService, private router: Router, private fb: FormBuilder) { }

	ngOnInit() {
		this.form = this.fb.group({
			text: [null, Validators.compose([Validators.required])]
		});
	}

	// Create
	create() {
    const newRole = {
      text: this.form.controls['text'].value
    } as Role
    this.roleService.createRole(newRole).subscribe(res => {
      this.router.navigate(['/roles']);
    }, err => {
      console.log(err);
    })
	}

	// Cancel
	cancel() {
		this.router.navigate(['/roles']);
	}

}

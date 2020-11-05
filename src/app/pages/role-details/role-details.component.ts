/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd
Date: 20 Oct 2020
Description: Role details component
============================================
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Role } from 'src/app/shared/role.interface';
import { RoleService } from '../../shared/role.service';


@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {

  role: Role;
	roleId: string;
	form: FormGroup;

	constructor(private route: ActivatedRoute, private roleService: RoleService, private fb: FormBuilder, private router: Router) {
		this.roleId = this.route.snapshot.paramMap.get('roleId');

		this.roleService.findRoleById(this.roleId).subscribe(res => {
			this.role = res['data'];
		}, err => {
			console.log(err);
		}, () => {
			console.log(this.role.text + "response")
			this.form.controls['text'].setValue(this.role.text);
		})
	}

	ngOnInit() {
		this.form = this.fb.group({
			text: [null, Validators.compose([Validators.required])]
		});
	}

	// Save
	save() {
    const updateRole = {
      text: this.form.controls['text'].value
    } as Role
    this.roleService.updateRole(this.roleId,updateRole).subscribe(res => {
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

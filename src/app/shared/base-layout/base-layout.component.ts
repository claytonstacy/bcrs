/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd
Date: 20 Oct 2020
Description: base layout component ts file
============================================
*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();
  sessionUser: string;

  constructor(private cookieService: CookieService, private router: Router) {
    this.sessionUser = this.cookieService.get('session_user');
   }

  ngOnInit(): void {
  }

  logout() {
    this.cookieService.delete('session_user');
    this.router.navigate(['/session/signin'])

  }
}

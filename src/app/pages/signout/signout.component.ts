import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit {

  constructor(private routes:Router,private angularFireAuth:AngularFireAuth) { 
    var user = this.angularFireAuth.auth.currentUser; 
    this.angularFireAuth.auth.signOut(); 
  console.log(user);
  }

  ngOnInit() {

    this.routes.navigateByUrl('SignIn');
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public SignForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private routes:Router,private angularFireAuth:AngularFireAuth) { 
    this.SignForm = formBuilder.group({
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(12), Validators.required])]
    });
    var user = this.angularFireAuth.auth.currentUser;  
  console.log(user);
   }

  ngOnInit() {
  }
  Submit(){
    this.angularFireAuth.auth.signInWithEmailAndPassword(this.SignForm.value.email, this.SignForm.value.password)
    .then(value => {
      this.routes.navigateByUrl('dashboard'); 
      console.log('Nice, it worked!',value);
    })
    .catch(err => {
      console.log('Something went wrong:',err.message);
    }); 
    
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore'; 

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  
  public SignForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private routes:Router,private angularFireAuth:AngularFireAuth,private angularFirestore:AngularFirestore) { 
    this.SignForm = formBuilder.group({
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(12), Validators.required])],
      fullname: ['', Validators.compose([Validators.minLength(3),Validators.required])],
      mobilenumber: ['', [Validators.required, Validators.minLength(10),Validators.pattern('^[0-9]+$')]]
    });
   }

  ngOnInit() {
  }
  Submit(){
    
    console.log('Submitted');
    firebase.auth().createUserWithEmailAndPassword(this.SignForm.value.email, this.SignForm.value.password)
    .then(res => { 
      this.angularFirestore.collection('dashboardusers').doc(this.angularFireAuth.auth.currentUser.uid).set({
        displayName: this.SignForm.value.fullname,
        email: this.SignForm.value.email, 
        userid: this.angularFireAuth.auth.currentUser.uid,
        mobilenumber:this.SignForm.value.mobilenumber
       }).catch(error=>{
         alert(error.message)
       })
      this.routes.navigateByUrl('dashboard')
      console.log(res);
    }, err => 
    console.log(err))
  }


}

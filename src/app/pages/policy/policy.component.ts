import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  public PolicyForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private routes:Router,private angularFireAuth:AngularFireAuth) { 
    this.PolicyForm = formBuilder.group({
      policyName: ['', Validators.compose([ Validators.required])],
      policyPrice: ['', Validators.compose([ Validators.required])],
      beneficiaries: ['', Validators.compose([ Validators.required])],
      policyInfo: ['', Validators.compose([ Validators.required])],
    });
    var user = this.angularFireAuth.auth.currentUser;  
  console.log(user);
   }

  ngOnInit() {
  }
  Submit(){
    console.log(this.PolicyForm.value);
    console.log('Submit');
  }

}

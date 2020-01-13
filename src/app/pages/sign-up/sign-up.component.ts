import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  
  public SignForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private routes:Router) { 
    this.SignForm = formBuilder.group({
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(12), Validators.required])],
      fullname: ['', Validators.compose([Validators.minLength(3),Validators.required])],
      mobilenumber: ['', [Validators.required, Validators.minLength(10),Validators.pattern('^[0-9]+$')]]
    });
   }

  ngOnInit() {
  }

}

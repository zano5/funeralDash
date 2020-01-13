import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public SignForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private routes:Router) { 
    this.SignForm = formBuilder.group({
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(12), Validators.required])]
    });
   }

  ngOnInit() {
  }
  Submit(){
    console.log(this.SignForm.value );
    // this.routes.navigateByUrl('/Home')
    console.log('Submitted');
  }

}

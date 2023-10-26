import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/model/user';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: String = '';
  password: String = '';
  dataSource: User;
  isLoadingResults = false;

  constructor(private router: Router, private api: ApiService,
     private formBuilder: FormBuilder) { }

  ngOnInit() {
     this.loginForm = this.formBuilder.group({
    'email' : [null, Validators.required],
    'password' : [null, Validators.required]
  });
  }

  addLogin(form: NgForm) {
    this.isLoadingResults = true;
    this.api.login(form)
      .subscribe(res => {
          this.dataSource = res;
          localStorage.setItem("jwt", this.dataSource.token);
          this.isLoadingResults = false;
          this.router.navigate(['/products']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide = true;

  constructor(private snack: MatSnackBar) {
    this.form = new FormGroup({
      $key: new FormControl(null),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  ngOnInit() {
  }

  onClear() {
    this.form.reset();
    this.initFormGroup();
  }

  goToMain() {
    this.snack.open("Uspešna prijava.");
  }

  initFormGroup() {
    this.form.setValue({
      $key: null,
      username: '',
      password: '',
    });
  }

}

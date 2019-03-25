import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/employee.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { MatSnackBar } from '@angular/material';
import { EmployeesComponent } from '../employees.component';
import { templateSourceUrl } from '@angular/compiler';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public service: EmployeeService,
    private snack: MatSnackBar) { }

  onClear() {
    this.service.form.reset();
    this.service.initFormGroup();
  }

  openSnackBar() {
    this.snack.open("Login is okey.");
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    hide: boolean;
    loading: boolean;

    constructor(private snack: MatSnackBar, private userService: UserService) {
        this.hide = true;
        this.form = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        });
    }

    ngOnInit() {
        this.loading = false;
    }

    onClear() {
        this.form.reset();
        this.initFormGroup();
        this.loading = false;
    }

    goToMain() {
        // test 
        console.log('== form value', this.form.value);
        this.userService.loginUser(this.form.value)
                .subscribe(res => {
                        this.loading = false;
                        console.log(res); 
                    }, err => {
                        this.loading = false;
                        console.log(err);
                    });
    }

    initFormGroup() {
        this.form.setValue({
            username: '',
            password: '',
        });
    }

}

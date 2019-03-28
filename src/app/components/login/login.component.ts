import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user/user.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    @ViewChild("firstField") firstName: ElementRef;
    form: FormGroup;
    hidePass: boolean;

    constructor(private snack: MatSnackBar,
                private userService: UserService) {
            this.hidePass = true;
            this.form = new FormGroup({
                username: new FormControl('', Validators.required),
                password: new FormControl('', [Validators.required, Validators.minLength(8)]),
            });
    }

    ngOnInit() {
        this.firstName.nativeElement.focus();
        
    }

    onClear() {
        this.form.reset();
        this.initFormGroup();
    }

    goToMain() {
        this.userService.loginUser(this.form.value)
            .subscribe(res => {
            }, err => {
                console.log(" = LoginComponent = ", err);
                this.snack.open("Korisničko ime ili lozinka nisu ispravni.");
            });
    }

    initFormGroup() {
        this.form.setValue({
            username: '',
            password: '',
        });
    }

}

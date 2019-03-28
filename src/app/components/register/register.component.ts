import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    @ViewChild("firstField") firstName: ElementRef;
    form: FormGroup;
    hidePass: boolean;

    constructor(private snack: MatSnackBar,
        private userService: UserService) {
        }
        
        ngOnInit() {
            this.firstName.nativeElement.focus();
            this.hidePass = true;
            this.form = new FormGroup({
                first_name: new FormControl('', Validators.required),
                last_name: new FormControl('', Validators.required),
                username: new FormControl('', [Validators.required, Validators.email]),
                password: new FormControl('', [Validators.required, Validators.minLength(8)]),
            });
    }

    goToMain() {
        this.userService.register(this.form.value)
                    .subscribe(res => {
                    }, err => {
                        console.log('= Register err = ', err);
                        this.snack.open("Registracnija nije uspešna. Pokušajte ponovo.");
                    });
    }

    onClear() {
        this.form.reset();
        this.initFormGroup();
    }

    initFormGroup() {
        this.form.setValue({
            first_name: '',
            last_name: '',
            username: '',
            password: '',
        });
    }
    
}

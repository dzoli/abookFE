import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    userProfile: any;
    form: FormGroup;

    constructor(private userService: UserService) {
        this.userProfile = {};
    }

    ngOnInit() {
        this.userService.currentProfile()
            .subscribe((res) => {
                this.userProfile = res;
                console.log(' -- user profile --', this.userProfile);
            });
        this.form = new FormGroup({
            first_name: new FormControl('', Validators.required),
            last_name: new FormControl('', Validators.required),
            username: new FormControl('', [Validators.required, Validators.email]),
        });
    }

}

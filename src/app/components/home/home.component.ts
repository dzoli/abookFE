import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    userProfile: any;

    constructor(private userService: UserService,
                private snack: MatSnackBar) {

        // this.userService.currentProfile()
        //     .subscribe(res => {
        //         this.userProfile = res;
        //         console.log('== HomeComponent - currentProfile() == ', this.userProfile);
        //     }, err => {
        //         this.snack.open('Nije moguće učitati podatke.');
        //         console.log('== HomeComponent - ngOnInit == ', err);
        //     });
        this.userProfile = {
            'address': "adr 124",
            'department': "dep 1",
            'id': '1',
            'office': "office 12222",
            'personal_web_site': "https://www.google.rs/",
            'phone': "021 / 021 021 021",
            'profile_img': "http://localhost:8000/media/images/admin_s/Buenos-Aires-for-desktop_IP8NkxW.jpg",
            'user': {'id': 1, 'username': "admin_s", 'first_name': "admin_s22232", 'last_name': "aaaa1"},
            'workplace': "workplace 12"
        }
    }

    ngOnInit() {

    }

}

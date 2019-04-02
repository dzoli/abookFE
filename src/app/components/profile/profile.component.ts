import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/shared/user/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    userProfile: any;
    form: FormGroup;
    panelOpenState = false;

    // preview image
    public imagePath: any;
    public message: string;

    private selectedFile: File;

    preview(files: any) {
        if (files.length === 0) {
            return;
        }

        const mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = 'Tip fajla mora biti slika.';
            return;
        }

        this.selectedFile = files[0];
        const reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.userProfile.profile_img = reader.result;
            this.form.patchValue({
                profile_img: reader.result
            });
            console.log('--userprof==', this.userProfile);

             // need to run CD since file load runs outside of zone
             this.cd.markForCheck();
        }

    }

    constructor(private userService: UserService, private snack: MatSnackBar, private cd: ChangeDetectorRef) {
        this.userProfile = {};
    }

    ngOnInit() {
        this.userService.currentProfile()
            .subscribe((res) => {
                this.userProfile = res;
                this.initFormValues();
            });
        this.form = new FormGroup({
            first_name: new FormControl('', Validators.required),
            last_name: new FormControl('', Validators.required),
            username: new FormControl('', [Validators.required]),
            address: new FormControl(),
            workplace: new FormControl(),
            office: new FormControl(),
            phone: new FormControl(),
            department: new FormControl(),
            personal_web_site: new FormControl(),
            profile_img: new FormControl()
        });
    }

    onFileSelected(event: any) {
        console.log(event);
    }

    updateProfile() {
        this.userService.updateProfile(this.userProfile, this.form.value, this.selectedFile)
            .subscribe((res) => {
                this.snack.open('Podaci uspešno snimljeni.');
            }, (err) => {
                console.log('--error prof. update --', err);
                this.snack.open('Podaci nisu uspešno snimljeni.');
            });
    }

    initFormValues() {
        this.form.setValue({
            first_name: this.userService.loginData.user.first_name,
            last_name: this.userService.loginData.user.last_name,
            username: this.userService.loginData.user.username,
            address: this.userProfile.address,
            workplace: this.userProfile.workplace,
            office: this.userProfile.office,
            phone: this.userProfile.phone,
            department: this.userProfile.department,
            personal_web_site: this.userProfile.personal_web_site,
            profile_img: null
        });
    }

    clearForm() {
        this.form.reset();
        this.initFormGroup();
    }

    initFormGroup() {
        this.form.setValue({
            first_name: '',
            last_name: '',
            username: '',
            address: '',
            workplace: '',
            office: '',
            phone: '',
            department: '',
            personal_web_site: '',
            profile_img: null
        });
    }

}
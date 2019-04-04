import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/user/user.service';
import { MatSnackBar, MatTableDataSource, MatSort, MatDialog, MatExpansionPanel } from '@angular/material';
import { Project } from '../../models/project.model';
import { AddProjectComponent } from '../add-project/add-project.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    userProfile: any;

    projectsDs;
    project_cols = ['title', 'label', 'pmf_status', 'project_manager', 'start_year', 'duration'];
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('projectsPanel') projectsPanel: MatExpansionPanel;
    @ViewChild('groupsPanel') groupsPanel: MatExpansionPanel;

    constructor(private userService: UserService,
                private snack: MatSnackBar,
                private dialog: MatDialog) {
        // this.userProfile = {
        //     'address': "adr 124",
        //     'department': "dep 1",
        //     'id': '1',
        //     'office': "office 12222",
        //     'personal_web_site': "https://www.google.rs/",
        //     'phone': "021 / 021 021 021",
        //     'profile_img': "http://localhost:8000/media/images/admin_s/Buenos-Aires-for-desktop_IP8NkxW.jpg",
        //     'user': {'id': 1, 'username': "admin_s", 'first_name': "admin_s22232", 'last_name': "aaaa1"},
        //     'workplace': "workplace 12"
        // }
    }

    ngOnInit() {
        this.userService.userProjects()
            .subscribe(res => {
                this.projectsDs = new MatTableDataSource(res);
                this.projectsDs.sort = this.sort;
            }, err => {
                console.log('== HomeComponent - ngOnInit ==', err);
            });
        this.userService.currentProfile()
            .subscribe(res => {
                this.userProfile = res;
            }, err => {
                this.snack.open('Nije moguće učitati podatke.');
                console.log('== HomeComponent - ngOnInit == ', err);
            });
    }

    showAddProjectDialog(): void {
        const addProjectRef = this.dialog.open(AddProjectComponent, {
            width: '850px',
            data: {}
        });

        addProjectRef.afterClosed().subscribe(res => {
            this.projectsPanel.open();
            this.groupsPanel.close();
        });
    }

}

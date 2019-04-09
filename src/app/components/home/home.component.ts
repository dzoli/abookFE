import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/user/user.service';
import { MatSnackBar, MatTableDataSource, MatSort, MatDialog, MatExpansionPanel } from '@angular/material';
import { Project } from '../../models/project.model';
import { AddProjectComponent } from '../add-project/add-project.component';
import { Profile } from 'src/app/models/profile.model';
import { Course } from 'src/app/models/course.model';
import {map, switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    project_cols = ['title', 'label', 'pmf_status', 'project_manager', 'start_year', 'duration'];

    projectsDs: MatTableDataSource<Project>;
    coursesDs: Array<Course>;
    userProfile: Profile;
    loading: boolean = true;

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
        this.refreshUserData();
        this.userService.currentProfile()
            .pipe(map((res: any) => { 
                    this.userProfile = res;
                    this.loading = false;
                    return this.userProfile.id;}), 
                  switchMap(id => this.userService.coursesForProfesor(id)))
            .subscribe((courses: Array<Course>) => {
                this.coursesDs = courses;
                console.log(this.coursesDs);
            });
    }

    showAddProjectDialog(): void {
        const addProjectRef = this.dialog.open(AddProjectComponent, {
            width: '850px',
            data: { profileId: this.userProfile.id }
        });

        addProjectRef.afterClosed().subscribe(res => {
            this.refreshUserData();
            this.projectsPanel.open();
            this.groupsPanel.close();
        });
    }

    private refreshUserData() {
        this.userService.userProjects()
            .subscribe(res => {
                this.projectsDs = new MatTableDataSource<Project>(res);
                this.projectsDs.sort = this.sort;
            }, err => {
                console.log('== HomeComponent - refreshUserData() == ', err);
            });
    }
}

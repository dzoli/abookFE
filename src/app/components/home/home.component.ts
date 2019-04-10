import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/user/user.service';
import { MatSnackBar, MatTableDataSource, MatSort, MatDialog, MatExpansionPanel } from '@angular/material';
import { Project } from '../../models/project.model';
import { AddProjectComponent } from '../add-project/add-project.component';
import { Profile } from 'src/app/models/profile.model';
import { Course } from 'src/app/models/course.model';
import {map, switchMap} from 'rxjs/operators';
import { AddCourseComponent } from '../add-course/add-course.component';

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
        private dialog: MatDialog) {}

    ngOnInit() {
        this.refreshUserData(); // get projects
        this.userService.currentProfile()   // get courses
            .pipe(map((res: any) => { 
                    this.userProfile = res;
                    this.loading = false;
                    return this.userProfile.id;}), 
                  switchMap(id => this.userService.coursesForProfesor()))
            .subscribe((courses: Array<Course>) => {
                this.coursesDs = courses;
                console.log(' == init courses ==', this.coursesDs);
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

    showAddCoursesDialog(): void {
        const addProjectRef = this.dialog.open(AddCourseComponent, {
            width: '850px',
            data: { profileId: this.userProfile.id }
        });

        addProjectRef.afterClosed().subscribe(res => {
            this.refreshCoursesData();
            this.projectsPanel.close();
            this.groupsPanel.open();
        });
    }

    private refreshCoursesData() {
        this.userService.coursesForProfesor()
                .subscribe(res => {
                    this.coursesDs = res;
                    console.log('-- courses refreshed ==', this.coursesDs);
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

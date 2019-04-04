import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/user/user.service';
import { MatTab, MatTableDataSource, MatSort } from '@angular/material';

@Component({
    selector: 'app-add-project',
    templateUrl: './add-project.component.html',
    styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

    allProjectsDs;
    project_cols = ['title', 'label', 'pmf_status', 'project_manager', 'start_year', 'duration'];
    @ViewChild(MatSort) sort: MatSort;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.allPorjects()
                .subscribe(res => {
                    console.log('== projects ==', res);
                    this.allProjectsDs = new MatTableDataSource(res);
                    this.allProjectsDs.sort = this.sort;
                }, err => {
                    console.log('== AddProjectComponent ==', err);
                });
    }

}

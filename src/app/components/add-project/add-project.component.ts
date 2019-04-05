import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { UserService } from 'src/app/shared/user/user.service';
import { MatTab, MatTableDataSource, MatSort, MatSnackBar, MatDialogRef, MatPaginator, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { Project } from 'src/app/models/project.model';
import { SelectionModel } from '@angular/cdk/collections';
import { ProjectRole } from 'src/app/models/project-role.models';

@Component({
    selector: 'app-add-project',
    templateUrl: './add-project.component.html',
    styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    project_cols = ['title', 'label', 'pmf_status', 'project_manager', 'start_year', 'duration', 'select', 'role'];
    allProjectsDs: MatTableDataSource<Project>;
    selection = new SelectionModel<Project>(true, []);

    // this map tracks role changing, also
    // all use for checking is all selected project has defined roles
    afterSelectionDs: Map<number, ProjectRole> = new Map<number, ProjectRole>();

    constructor(private userService: UserService,
        private snack: MatSnackBar,
        public dialogRef: MatDialogRef<AddProjectComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.userService.allPorjects()
            .subscribe(res => {
                console.log('== projects ==', res);
                this.allProjectsDs = new MatTableDataSource(res);
                this.allProjectsDs.sort = this.sort;
                this.allProjectsDs.paginator = this.paginator;

                // init afterSelectionDs
                this.allProjectsDs.data.forEach( (p: Project) => {
                    this.afterSelectionDs.set(p.id, new ProjectRole(p.id, p.title, p.label, p.pmf_status, p.project_manager, p.start_year, p.duration, -1));
                });

                console.log(' == after selection == ', this.afterSelectionDs);
            }, err => {
                console.log('== AddProjectComponent ngOnInit==', err);
            });
    }

    changeRole(roleId: number, project: Project) {
        console.log('selection changed == ', roleId, project);
        this.afterSelectionDs.set(project.id, new ProjectRole(project.id, project.title, project.label,
                                                            project.pmf_status, project.project_manager, 
                                                            project.start_year, project.duration, roleId));
    }

    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.title + 1}`;
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.allProjectsDs.data.length;
        return numSelected === numRows;
    }

    clearSelection() {
        this.selection.clear();
    }

    saveSelectedProjects() {
        this.dialogRef.close();
        this.snack.open('Podaci uspešno sačuvani.');
        console.log('selected ==   ', this.selection);
        console.log(' after selection = ', this.afterSelectionDs);

        let allSelectedHasRoles: boolean = true;
        let selectedProjects: Array<ProjectRole> = new Array<ProjectRole>();
        this.selection.selected.forEach(selected => {
            if(this.afterSelectionDs.get(selected.id).role == -1){
                this.snack.open('Za svaki projekat mora biti definisana uloga.');
                return;
            }
            if (this.afterSelectionDs.has(selected.id)){
                selectedProjects.push(this.afterSelectionDs.get(selected.id));
            }
        })

        this.userService.saveProjects(this.data.profileId, selectedProjects);
    }

    /* Search filter */
    applyFilter(txtFilter) {
        console.log(txtFilter);
        this.allProjectsDs.filter = txtFilter.trim().toLowerCase();
    }
}

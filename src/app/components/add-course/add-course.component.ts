import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Course } from 'src/app/models/course.model';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from 'src/app/shared/user/user.service';
import { CourseRole } from 'src/app/models/course-role.model';

@Component({
    selector: 'app-add-course',
    templateUrl: './add-course.component.html',
    styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    course_cols = ['no', 'title', 'select'];
    allCoursesDs: MatTableDataSource<Course>;
    selection = new SelectionModel<Course>(true, []);

    constructor(private userService: UserService,
        private snack: MatSnackBar,
        public dialogRef: MatDialogRef<AddCourseComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.userService.allCourses()
            .subscribe(res => {
                console.log('== courses ==', res);
                this.allCoursesDs = new MatTableDataSource(res);
                this.allCoursesDs.sort = this.sort;
                this.allCoursesDs.paginator = this.paginator;
            }, err => {
                console.log('== AddCourseComponent ngOnInit==', err);
            });
    }

    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.title + 1}`;
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.allCoursesDs.data.length;
        return numSelected === numRows;
    }

    clearSelection() {
        this.selection.clear();
    }

    saveSelectedCourses() {
        console.log('selected == ', this.selection);

        if (this.selection.selected.length == 0) {
            this.snack.open('Nije izabran ni jedan kurs.');
        } else {
            // this.userService.saveProjects(this.data.profileId, selectedProjects)
            //     .subscribe(res => {
            //         this.snack.open('Izabrani projekti su uspešno sačuvani.');
            //         this.dialogRef.close();
            //     }, err => {
            //         this.snack.open('Izabrani projekti nisu uspešno sačuvani.');
            //     });
            this.userService.saveCourses(this.data.profileId, this.selection.selected)
                .subscribe(res => {
                    this.snack.open('Izabrani kursevi su uspešno sačuvani.');
                    this.dialogRef.close();
                },
                    err => {
                        this.snack.open('Izabrani kursevi nisu uspešno sačuvani.');
                    });
            console.log('== selected courses == ', this.data.profileId, this.selection.selected);
        }
    }

    /* Search filter */
    applyFilter(txtFilter: any) {
        console.log(txtFilter);
        this.allCoursesDs.filter = txtFilter.trim().toLowerCase();
    }

}

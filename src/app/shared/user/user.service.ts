import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Observer } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Router, RouterLinkWithHref } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Project } from '../../models/project.model';
import { ProjectMembership } from 'src/app/models/project-membership.models';
import { ProjectRole } from 'src/app/models/project-role.models';
import { Profile } from 'src/app/models/profile.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    private baseUrl: string = environment.apiUrl;
    public loginData: any;
    public isAuthenticated: boolean;
    public userProfile: Profile

    constructor(private http: HttpClient, private router: Router) {
        this.isAuthenticated = false;
    }

    loginUser(userData: any): Observable<any> {
        const authUrl = this.baseUrl + 'authenticate/';
        return new Observable((o) => {
            this.http.post(authUrl, userData, { headers: this.httpHeaders })
                .subscribe((res) => {
                    this.loginData = res;
                    this.isAuthenticated = true;
                    this.router.navigateByUrl('contacts/home');
                    o.next(res);
                    return o.complete();
                }, (err) => {
                    return o.error(err);
                })
        });
    }

    register(userData: any): Observable<any> {
        const registerUrl = this.baseUrl + 'users/';
        console.log('--register--', userData);
        return new Observable((o) => {
            this.http.post(registerUrl, {
                'first_name': userData.first_name,
                'last_name': userData.last_name,
                'password': userData.password,
                'username': userData.username,
                'email': userData.username     // email is like username
            }, { headers: this.httpHeaders })
                .subscribe((res) => {
                    o.next(res);
                    this.router.navigateByUrl('login');
                    return o.complete();
                },
                    (err) => o.error(err));
        });
    }

    logout() {
        this.isAuthenticated = false;
        this.loginData = {};
        console.log('user is logged out: ', this.isAuthenticated, this.loginData);
        this.router.navigateByUrl('login');
    }

    currentProfile(): Observable<any> {
        const url = this.baseUrl + 'profiles/' + this.loginData.user.id + '/';
        return new Observable((o: any) => {
            this.http.get(url, { headers: this.httpHeaders })
                .subscribe((res: Profile) => {
                    this.userProfile = res;
                    o.next(res);
                    return o.complete();
                }, (err) => {
                    return o.error(err);
                });
        })
    }

    updateProfile(profile: any, formData: any, selectedFile: File): Observable<any> {
        const url = this.baseUrl + 'profiles/' + profile.id + '/';
        let uploadData: FormData = new FormData();
        uploadData.append('id', String(profile));
        uploadData.append('department', formData.department);
        uploadData.append('workplace', formData.workplace);
        uploadData.append('office', formData.office);
        uploadData.append('phone', formData.phone);
        uploadData.append('addres', formData.addres);
        uploadData.append('personal_web_site', formData.personal_web_site);
        uploadData.append('user.id', this.loginData.user.id);
        uploadData.append('user.username', formData.username);
        uploadData.append('user.first_name', formData.first_name);
        uploadData.append('user.last_name', formData.last_name);
        uploadData.append('profile_img', selectedFile);

        return new Observable((o: any) => {
            this.http.put(url, uploadData).subscribe((res) => {
                o.next(res);
                return o.complete();
            }, (err) => {
                o.error(err);
            });
        });
    }

    userProjects(): Observable<Project[]> {
        const url = this.baseUrl + 'projects/?id=' + this.loginData.user.id;
        return this.http.get<Project[]>(url, { headers: this.httpHeaders });
    }

    allPorjects(): Observable<Project[]> {
        const url = this.baseUrl + 'projects/?nid=' + this.loginData.user.id;
        return this.http.get<Project[]>(url, { headers: this.httpHeaders });
    }

    saveProjects(profileId: number, selectedProjects: ProjectRole[]): Observable<any> {
        const url = this.baseUrl + 'projectmemberships/';
        let memberships: Array<ProjectMembership> = new Array<ProjectMembership>();

        selectedProjects.forEach(p => {
            memberships.push(new ProjectMembership(profileId, p.id, p.role));
        });

        console.log(memberships);
        return this.http.post(url, memberships, { headers: this.httpHeaders });
    }

    allRoles(): Observable<any> {
        const url = this.baseUrl + 'roles/';
        return this.http.get(url, { headers: this.httpHeaders });
    }
}
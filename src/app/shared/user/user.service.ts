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
                    o.next(res);
                    return o.complete();
                }, (err) => {
                    return o.error(err);
                });
        })
    }

    updateProfile(profile: any, formData: any, selectedFile: File): Observable<any> {
        const url = this.baseUrl + 'profiles/' + profile.id + '/';
        if (formData.profile_img != null) {
            let multipartPayload: FormData = new FormData();
            multipartPayload.append('id', String(profile.id));
            multipartPayload.append('department', formData.department);
            multipartPayload.append('workplace', formData.workplace);
            multipartPayload.append('office', formData.office);
            multipartPayload.append('phone', formData.phone);
            multipartPayload.append('address', formData.addres);
            multipartPayload.append('personal_web_site', formData.personal_web_site);
            multipartPayload.append('user.id', this.loginData.user.id);
            multipartPayload.append('user.username', formData.username);
            multipartPayload.append('user.first_name', formData.first_name);
            multipartPayload.append('user.last_name', formData.last_name);
            multipartPayload.append('profile_img', selectedFile);

            return new Observable((o: any) => {
                this.http.put(url, multipartPayload).subscribe((res) => {
                    o.next(res);
                    this.router.navigateByUrl('contacts/home');
                    return o.complete();
                }, (err) => {
                    o.error(err);
                });
            });
        } else {
            let jsonPayload = {
                'id': profile.id,
                'department': formData.department,
                'workplace': formData.workplace,
                'office': formData.office,
                'phone': formData.phone,
                'address': formData.address,
                'personal_web_site': formData.personal_web_site,
                'user': {
                    'id': this.loginData.user.id,
                    'username': formData.username,
                    'first_name': formData.first_name,
                    'last_name': formData.last_name
                }
            };
            return new Observable((o: any) => {
                this.http.put(url, jsonPayload, { headers: this.httpHeaders })
                    .subscribe((res) => {
                        o.next(res);
                        this.router.navigateByUrl('contacts/home');
                        return o.complete();
                    }, (err) => {
                        o.error(err)
                    });
            })
        }
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

    coursesForProfesor(profesorId: number): Observable<any> {
        const url = this.baseUrl + 'courses/?id=' + profesorId;
        return this.http.get(url, { headers: this.httpHeaders });
    }
}
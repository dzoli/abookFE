import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent
    },
    { 
        path: 'login', 
        component: LoginComponent 
    },
    { 
        path: '', 
        redirectTo: '/login',  
        pathMatch: 'full' 
    },
    { 
        path: 'contacts', 
        canActivate: [AuthGuard],
        component: MainNavComponent,
        children: [
            {
                path: 'profile',
                canActivate: [AuthGuard],
                component: ProfileComponent
            },
            {
                path: 'home',
                canActivate: [AuthGuard],
                component: HomeComponent
            }
        ]
    },
    // add 404 not found component
    {   
        path: '**',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RegisterComponent } from './components/register/register/register.component';

const routes: Routes = [
    { 
      path: '', 
      redirectTo: '/login', 
      pathMatch: 'full' 
    },
    { 
        path: 'login', 
        component: LoginComponent 
    },
    { 
        path: 'home', 
        canActivate: [AuthGuard],
        component: MainNavComponent 
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

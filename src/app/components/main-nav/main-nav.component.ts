import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      // map(result => result.matches)
      map(result => true)
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private userService: UserService) {
    console.log(userService.isAuthenticated);
    console.log(userService.loginData);
  }

  logOut() {
    console.log(' -main logout - ', this.userService.loginData);
    this.userService.logout();
  }


}

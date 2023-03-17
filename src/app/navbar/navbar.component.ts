import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private userService: UserService,
    private router: Router
    ) { }

  isLoggedIn(): boolean {
    console.log(this.userService.isLoggedIn());
    return this.userService.isLoggedIn();
  }

  logout(): void {
    this.userService.logout().then(() => {
      console.log('Usuario desconectado');
      this.router.navigate(['/']);
    });
  }
}

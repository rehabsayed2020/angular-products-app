
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/services/auth-service';
import { UserService } from '../../auth/services/user.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  menuOpen = signal(false);
  profileOpen = signal(false);
  userService=inject(UserService)

  user = signal({ name: 'John Doe', email: 'john@mail.com' });

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  toggleProfile() {
    this.profileOpen.set(!this.profileOpen());
  }

  logout() {
    this.userService.logout();
  }


}

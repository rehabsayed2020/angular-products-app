import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { SpinnerComponent } from 'src/app/shared/components/spinner-component/spinner-component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  isLoading = false;


  errorMessage = signal('');

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.errorMessage.set('');
    let observable = this.userService.login(this.loginForm.value as { email: string; password: string });
    observable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: res => {
        this.router.navigate(['/products']);
        this.isLoading = false;
      },
      error: err => {
        this.errorMessage.set(err.message);
        this.isLoading = false;
      },
    });
  }


}

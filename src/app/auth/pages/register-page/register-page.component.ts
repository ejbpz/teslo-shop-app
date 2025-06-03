import { AuthService } from '@/auth/services/auth.service';
import { FormUtils } from '@/utils/form-utils';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  hasError = signal<boolean>(false);

  registerForm: FormGroup = this.formBuilder.group({
    fullName: [
      '',
      [
        Validators.required,
        Validators.pattern(FormUtils.namePattern)
      ]
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(FormUtils.emailPattern)
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],
  });

  onSubmit() {
    if(this.registerForm.invalid) {
      this.showError();
    }

    const {fullName = '', email = '', password = ''} = this.registerForm.value;

    this.authService.register(fullName, email, password).subscribe(
      (isValid) => {
        if(isValid) {
          this.router.navigateByUrl('/auth/login');
          return;
        }

        this.showError();
      }
    );
  }

  showError() {
    this.hasError.set(true);
    setTimeout(() => {
      this.hasError.set(false);
    }, 2000);

    return;
  }
}

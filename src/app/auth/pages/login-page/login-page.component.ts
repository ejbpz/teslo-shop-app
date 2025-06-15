import { AuthService } from '@/auth/services/auth.service';
import { FormUtils } from '@/utils/form-utils';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
})
export default class LoginPageComponent {
  private formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  route = toSignal(
    inject(ActivatedRoute).queryParams.pipe(
      map((param) => param['redirectTo'])
    )
  );


  hasError = signal(false);
  isPosting = signal(false);

  loginForm: FormGroup = this.formBuilder.group({
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
    ]
  });

  onSubmit() {
    if(this.loginForm.invalid) {
      this.showError();
    }

    const {email = '', password = ''} = this.loginForm.value;

    this.authService.login(email, password).subscribe(
      (isValid) => {
        if(isValid) {
          this.router.navigate([`${this.route()}`]);
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

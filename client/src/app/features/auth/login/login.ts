import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BlurValidatorDirective } from '../../../directives/blur-validator/blur-validator';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthFormService } from '../../../shared/services/authForm.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, BlurValidatorDirective, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm!: FormGroup;
  emailValidationData = { isInvalid: false, errorMessage: '' };
  passwordValidationData = { isInvalid: false, errorMessage: '' };
  formType: string = 'Login Form';
  boundValidateForm!: () => void;

  constructor(private authFormService: AuthFormService, private authService: AuthService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      if (params['alert'] === 'auth') {
        alert('You must be logged in to be able to go to this page');
      }
    });

    this.boundValidateForm = this.validateForm.bind(this);
    this.loginForm = this.authFormService.createForm(this.formType);

    this.loginForm.statusChanges.subscribe(() => {
      this.validateForm();
      console.log(this.emailValidationData.isInvalid);
    });
  }

  validateForm(): void {
    this.emailValidationData = { ...this.authFormService.emailValidator(this.loginForm) };
    this.passwordValidationData = { ...this.authFormService.passwordValidator(this.loginForm, this.formType) };
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.authFormService.markFormAsTouched(this.loginForm);
      return;
    }

    let { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        alert('Email or password is incorrect!');
      }
    });
  }

}

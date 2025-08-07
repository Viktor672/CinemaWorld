import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BlurValidatorDirective } from '../../../directives/blur-validator/blur-validator';
import { Router, RouterLink } from '@angular/router';
import { FormService } from '../../../shared/services/authForm.service';
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

  constructor(private formService: FormService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.boundValidateForm = this.validateForm.bind(this);
    this.loginForm = this.formService.createForm(this.formType);

    this.loginForm.statusChanges.subscribe(() => {
      this.validateForm();
      console.log(this.emailValidationData.isInvalid);
    });
  }

  validateForm(): void {
    this.emailValidationData = { ...this.formService.emailValidator(this.loginForm) };
    this.passwordValidationData = { ...this.formService.passwordValidator(this.loginForm, this.formType) };
  }

    onSubmit(): void {
    if (this.loginForm.invalid) {
      this.formService.markFormAsTouched(this.loginForm);
      return;
    }

    let { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }

}

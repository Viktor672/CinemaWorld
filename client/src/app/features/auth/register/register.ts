import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthFormService } from '../../../shared/services/authForm.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { BlurValidatorDirective } from '../../../directives/blur-validator/blur-validator';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, BlurValidatorDirective, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  registerForm!: FormGroup;
  usernameValidationData = { isInvalid: false, errorMessage: '' };
  emailValidationData = { isInvalid: false, errorMessage: '' };
  countryValidationData = { isInvalid: false, errorMessage: '' };
  passwordValidationData = { isInvalid: false, errorMessage: '' };
  rePasswordValidationData = { isInvalid: false, errorMessage: '' };
  formType: string = 'Register Form';
  boundValidateForm!: () => void;

  constructor(private authFormService: AuthFormService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.boundValidateForm = this.validateForm.bind(this);
    this.registerForm = this.authFormService.createForm(this.formType);

    this.registerForm.statusChanges.subscribe(() => {
      this.validateForm();
      console.log(this.emailValidationData.isInvalid);
    });
  }

  validateForm(): void {
    this.usernameValidationData = { ...this.authFormService.usernameValidator(this.registerForm) };
    this.emailValidationData = { ...this.authFormService.emailValidator(this.registerForm) };
    this.countryValidationData = { ...this.authFormService.countryValidator(this.registerForm) };
    this.passwordValidationData = { ...this.authFormService.passwordValidator(this.registerForm, this.formType) };
    this.rePasswordValidationData = { ...this.authFormService.rePasswordValidator(this.registerForm) };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.authFormService.markFormAsTouched(this.registerForm);
      return;
    }

    let { username, email, country } = this.registerForm.value;
    let { password, rePassword } = this.registerForm.value.passwords;

    this.authService.register(username, email, country, password, rePassword).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        alert('Register failed!');
      }
    });
  }
}

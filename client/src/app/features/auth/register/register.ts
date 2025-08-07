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
  passwordValidationData = { isInvalid: false, errorMessage: '' };
  rePasswordValidationData = { isInvalid: false, errorMessage: '' };
  formType: string = 'Register Form';
  boundValidateForm!: () => void;

  constructor(private formService: AuthFormService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.boundValidateForm = this.validateForm.bind(this);
    this.registerForm = this.formService.createForm(this.formType);

    this.registerForm.statusChanges.subscribe(() => {
      this.validateForm();
      console.log(this.emailValidationData.isInvalid);
    });
  }

  validateForm(): void {
    this.usernameValidationData = { ...this.formService.usernameValidator(this.registerForm) };

    this.emailValidationData = { ...this.formService.emailValidator(this.registerForm) };
    this.passwordValidationData = { ...this.formService.passwordValidator(this.registerForm, this.formType) };
    this.rePasswordValidationData = { ...this.formService.rePasswordValidator(this.registerForm) };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.formService.markFormAsTouched(this.registerForm);
      return;
    }

    let { username, email } = this.registerForm.value;
    let { password, rePassword } = this.registerForm.value.passwords;

    this.authService.register(username, email, password, rePassword).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }
}

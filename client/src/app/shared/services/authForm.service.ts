import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { ValidationResult } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class AuthFormService {
    constructor(private formBuilder: FormBuilder) { }

    createForm(formType: string): FormGroup {
        if (formType === 'Register Form') {
            return this.formBuilder.group({
                username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
                email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]{4,})@(abv\.bg|gmail\.com)$/)]],
                passwords: this.formBuilder.group({
                    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]],
                    rePassword: ['', [Validators.required]]
                },
                    { validators: this.passwordsValidator })
            });
        }
        else if (formType === 'Login Form') {
            return this.formBuilder.group({
                email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]{4,})@(abv\.bg|gmail\.com)$/gm)]],
                password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]]
            });
        }

        throw new Error(`${formType} is invalid type!`);
    }



    getControlUsername(form: FormGroup) {
        return form.get('username');
    }

    getControlEmail(form: FormGroup) {
        return form.get('email');
    }

    getGroupPasswords(form: FormGroup) {
        return form.get('passwords') as FormGroup;
    }

    getControlPassword(form: FormGroup, typeForm: string) {
        if(typeForm === 'Login Form'){
            return form.get('password');
        }
        return this.getGroupPasswords(form).get('password');
    }

    getControlRepassword(form: FormGroup) {
        return this.getGroupPasswords(form).get('rePassword');
    }

    usernameValidator(form: FormGroup): ValidationResult {
        let usernameControl = this.getControlUsername(form);
        let isInvalid: boolean = Boolean(usernameControl?.invalid && (usernameControl?.touched || usernameControl?.dirty));
        let errorMessage: string = '';

        if (usernameControl?.errors?.['required']) {
            errorMessage = 'Username is required!';
        }
        else if (usernameControl?.errors?.['minlength']) {
            errorMessage = 'Username should have at least 4 characters!';
        }
        else if (usernameControl?.errors?.['maxlength']) {
            errorMessage = 'Username must be at most 20 characters!';
        }
        else {
            errorMessage = '';
        }

        return {
            isInvalid,
            errorMessage
        }
    }

    emailValidator(form: FormGroup): ValidationResult {
        let emailControl = this.getControlEmail(form);
        let isInvalid: boolean = Boolean(emailControl?.invalid && (emailControl?.touched || emailControl?.dirty));
        let errorMessage: string = '';

        if (emailControl?.errors?.['required']) {
            errorMessage = 'Email is required!';
        }
        else if (emailControl?.errors?.['pattern']) {
            errorMessage = 'Email should have valid Abv or Gmail adress';
        }
        else {
            errorMessage = '';
        }

        return {
            isInvalid,
            errorMessage
        }
    }

    passwordValidator(form: FormGroup, formType: string): ValidationResult {
        let hasMisMatched = null;
        let passwordsGroup = null;
        let rePasswordControl = null;

        if (formType === 'Register Form') {
            passwordsGroup = this.getGroupPasswords(form);
            rePasswordControl = this.getControlRepassword(form);
            
            let isRepasswordTouchedOrDirty = Boolean(rePasswordControl?.touched || rePasswordControl?.dirty) || null;
            hasMisMatched = Boolean(passwordsGroup?.errors?.['passwordsMismatch'] && isRepasswordTouchedOrDirty) || null;
        }

        let passwordControl = this.getControlPassword(form, formType);
        let isPasswordTouchedOrDirty = Boolean(passwordControl?.touched || passwordControl?.dirty);

        let isInvalid: boolean = Boolean((passwordControl?.invalid || hasMisMatched) && isPasswordTouchedOrDirty);
        let errorMessage: string = '';

        if (passwordControl?.errors?.['required']) {
            errorMessage = 'Password is required!';
        }
        else if (passwordControl?.errors?.['minlength']) {
            errorMessage = 'Password should have at least 8 characters!';
        }
        else if (passwordControl?.errors?.['pattern']) {
            errorMessage = 'Password should contain number, uppercase and lowercase letter!';
        }
        else if (hasMisMatched) {
            errorMessage = 'Passwords do not match!';
        }
        else {
            errorMessage = '';
        }

        return {
            isInvalid,
            errorMessage
        }
    }

    rePasswordValidator(form: FormGroup): ValidationResult {
        let passwordsGroup = this.getGroupPasswords(form);
        let rePasswordControl = this.getControlRepassword(form);

        let isRepasswordTouchedOrDirty = Boolean(rePasswordControl?.touched || rePasswordControl?.dirty);
        let hasMisMatched = Boolean(passwordsGroup?.errors?.['passwordsMismatch']);

        let isInvalid: boolean = Boolean((rePasswordControl?.invalid || hasMisMatched) && isRepasswordTouchedOrDirty);
        let errorMessage: string = '';

        if (rePasswordControl?.errors?.['required']) {
            errorMessage = 'Repeat password is required!';
        }
        else if (hasMisMatched) {
            errorMessage = 'Passwords do not match!';
        }

        return {
            isInvalid,
            errorMessage
        }
    }

    private passwordsValidator(passwordsGroup: AbstractControl): ValidationErrors | null {
        let password = passwordsGroup.get('password');
        let rePassword = passwordsGroup.get('rePassword');

        if (password?.value !== rePassword?.value) {
            return { passwordsMismatch: true };
        }
        else {
            return null;
        }
    }

    markFormAsTouched(form: FormGroup): void {
        Object.values(form.controls).forEach(control => {
            if (control instanceof FormControl) {
                control?.markAsTouched();
            }
            else if (control instanceof FormGroup) {
                Object.values(control.controls).forEach(nestedValue => {
                    nestedValue?.markAsTouched();
                });
            }
        });
    }


}
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidationResult } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class MovieFormService {
    constructor(private formBuilder: FormBuilder) { }

    createForm(): FormGroup {
        return this.formBuilder.group({
            title: ['', [Validators.required]],
            genre: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(250)]],
            imageUrl: ['', [Validators.required, Validators.pattern(/^(https?:\/\/.+\.(png|jpg|jpeg|gif|webp))$/)]],
            releaseDate: ['', [Validators.required]]
        });
    }

    getControlTitle(form: FormGroup) {
        return form.get('title');
    }

    getControlGenre(form: FormGroup) {
        return form.get('genre');
    }

    getControlDescription(form: FormGroup) {
        return form.get('description');
    }

    getControlImageUrl(form: FormGroup) {
        return form.get('imageUrl');
    }

    getControlReleaseDate(form: FormGroup) {
        return form.get('releaseDate');
    }

    titleValidator(form: FormGroup): ValidationResult {
        let titleControl = this.getControlTitle(form);
        let isInvalid: boolean = Boolean(titleControl?.invalid && (titleControl?.touched || titleControl?.dirty));
        let errorMessage: string = '';

        if (titleControl?.errors?.['required']) {
            errorMessage = 'Title is required!';
        }
        else {
            errorMessage = '';
        }

        return {
            isInvalid,
            errorMessage
        }
    }

    genreValidator(form: FormGroup): ValidationResult {
        let genreControl = this.getControlGenre(form);
        let isInvalid: boolean = Boolean(genreControl?.invalid && (genreControl?.touched || genreControl?.dirty));
        let errorMessage: string = '';

        if (genreControl?.errors?.['required']) {
            errorMessage = 'Genre is required!';
        }
        else if (genreControl?.errors?.['minlength']) {
            errorMessage = 'Genre should be at least 3 characters!';
        }
        else {
            errorMessage = '';
        }

        return {
            isInvalid,
            errorMessage
        }
    }

    descriptionValidator(form: FormGroup): ValidationResult {
        let descriptionControl = this.getControlDescription(form);
        let isInvalid: boolean = Boolean(descriptionControl?.invalid && (descriptionControl?.touched || descriptionControl?.dirty));
        let errorMessage: string = '';

        if (descriptionControl?.errors?.['required']) {
            errorMessage = 'Description is required!';
        }
        else if (descriptionControl?.errors?.['minlength']) {
            errorMessage = 'Description should be at least 20 characters!';
        }
        else if (descriptionControl?.errors?.['maxlength']) {
            errorMessage = 'Description must be at most 250 characters!';
        }
        else {
            errorMessage = '';
        }

        return {
            isInvalid,
            errorMessage
        }
    }

    imageUrlValidator(form: FormGroup): ValidationResult {
        let imageUrlControl = this.getControlImageUrl(form);
        let isInvalid: boolean = Boolean(imageUrlControl?.invalid && (imageUrlControl?.touched || imageUrlControl?.dirty));
        let errorMessage: string = '';

        if (imageUrlControl?.errors?.['required']) {
            errorMessage = 'Cover Url is required!';
        }
        else if (imageUrlControl?.errors?.['pattern']) {
            errorMessage = 'Please enter a valid http or https Cover URL!';
        }
        else {
            errorMessage = '';
        }

        return {
            isInvalid,
            errorMessage
        }
    }

    releaseDateValidator(form: FormGroup): ValidationResult {
        let releaseDateControl = this.getControlReleaseDate(form);
        let isInvalid: boolean = Boolean(releaseDateControl?.invalid && (releaseDateControl?.touched || releaseDateControl?.dirty));
        let errorMessage: string = '';

        if (releaseDateControl?.errors?.['required']) {
            errorMessage = 'Release Date is required!';
        }
        else {
            errorMessage = '';
        }

        return {
            isInvalid,
            errorMessage
        }
    }

    markFormAsTouched(form: FormGroup): void {
        Object.values(form.controls).forEach(control => {
            control?.markAsTouched();
        });
    }
}
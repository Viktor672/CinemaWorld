import { Component } from '@angular/core';
import { AutoPlayVideo } from '../../directives/autoplay/auto-play-video.directive';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../../core/services/movie.service';
import { MovieFormService } from '../../shared/services';
import { Router } from '@angular/router';
import { BlurValidatorDirective } from '../../directives/blur-validator/blur-validator';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-add-movie',
  imports: [ReactiveFormsModule, AutoPlayVideo, BlurValidatorDirective, CommonModule],
  templateUrl: './add-movie.html',
  styleUrl: './add-movie.css'
})
export class AddMovie {
  addMovieForm!: FormGroup;
  titleValidationData = { isInvalid: false, errorMessage: '' };
  genreValidationData = { isInvalid: false, errorMessage: '' };
  descriptionValidationData = { isInvalid: false, errorMessage: '' };
  imageUrlValidationData = { isInvalid: false, errorMessage: '' };
  releaseDateValidationData = { isInvalid: false, errorMessage: '' };
  previewUrl: string | null = null;
  selectedFileName: string | null = null;
  boundValidateForm!: () => void;

  constructor(private movieFormService: MovieFormService, private movieService: MovieService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.boundValidateForm = this.validateForm.bind(this);
    this.addMovieForm = this.movieFormService.createForm();

    this.addMovieForm.statusChanges.subscribe(() => {
      this.validateForm();
    });
  }

  onFileChange(event: Event) {
    let input = event.target as HTMLInputElement;

    let file = input.files?.[0] || null;
    this.selectedFileName = file ? file.name : null;

    if (!file) {
      this.previewUrl = null;
      this.addMovieForm.patchValue({ imageUrl: null });
      this.addMovieForm.get('imageUrl')?.updateValueAndValidity({ emitEvent: true });
      return;
    }

    let fileReader = new FileReader();

    fileReader.onload = (e) => {
      let dataUrl = e.target?.result as string;
      this.previewUrl = dataUrl;
      this.addMovieForm.patchValue({ imageUrl: dataUrl });
      this.addMovieForm.get('imageUrl')?.updateValueAndValidity({ emitEvent: true });
    };

    fileReader.readAsDataURL(file);
  }

  validateForm(): void {
    this.titleValidationData = { ...this.movieFormService.titleValidator(this.addMovieForm) };
    this.genreValidationData = { ...this.movieFormService.genreValidator(this.addMovieForm) };
    this.descriptionValidationData = { ...this.movieFormService.descriptionValidator(this.addMovieForm) };
    this.imageUrlValidationData = { ...this.movieFormService.imageUrlValidator(this.addMovieForm) };
    this.releaseDateValidationData = { ...this.movieFormService.releaseDateValidator(this.addMovieForm) };
  }

  onSubmit(): void {
    if (this.addMovieForm.invalid) {
      this.movieFormService.markFormAsTouched(this.addMovieForm);
      return;
    }

    let authorEmail = this.authService.currentUser()?.email;

    let { title, genre, description, imageUrl, releaseDate } = this.addMovieForm.value;

    this.movieService.addMovie(authorEmail, title, genre, description, imageUrl, releaseDate).subscribe({
      next: () => {
        this.router.navigate(['/movies']);
      },
      error: (error) => {
        alert(error.error);
      }
    });
  }
}
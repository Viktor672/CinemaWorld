import { Component } from '@angular/core';
import { AutoPlayVideo } from '../../directives/autoplay/auto-play-video.directive';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../../core/services/movie.service';
import { MovieFormService } from '../../shared/services';
import { Router } from '@angular/router';
import { BlurValidatorDirective } from '../../directives/blur-validator/blur-validator';
import { CommonModule } from '@angular/common';

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
  boundValidateForm!: () => void;

  constructor(private movieFormService: MovieFormService, private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.boundValidateForm = this.validateForm.bind(this);
    this.addMovieForm = this.movieFormService.createForm();

    this.addMovieForm.statusChanges.subscribe(() => {
      this.validateForm();
    });
  }

  validateForm(): void {
    this.titleValidationData = { ...this.movieFormService.titleValidator(this.addMovieForm) };
    console.log(this.genreValidationData);
    
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

    let { title, genre, description, imageUrl, releaseDate } = this.addMovieForm.value;

    this.movieService.addMovie(title, genre, description, imageUrl, releaseDate).subscribe({
      next: () => {
        this.router.navigate(['/movies']);
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }
}

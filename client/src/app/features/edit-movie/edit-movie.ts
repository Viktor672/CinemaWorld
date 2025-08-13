import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MovieFormService } from '../../shared/services';
import { MovieService } from '../../core/services/movie.service';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlurValidatorDirective } from '../../directives/blur-validator/blur-validator';
import { Movie } from '../../models';
import { AutoPlayVideo } from '../../directives/autoplay/auto-play-video.directive';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-edit-movie',
  imports: [ReactiveFormsModule, CommonModule, BlurValidatorDirective, AutoPlayVideo],
  templateUrl: './edit-movie.html',
  styleUrl: './edit-movie.css'
})
export class EditMovie {
  editMovieForm!: FormGroup;
  private movieId: string | null = '';

  titleValidationData = { isInvalid: false, errorMessage: '' };
  genreValidationData = { isInvalid: false, errorMessage: '' };
  descriptionValidationData = { isInvalid: false, errorMessage: '' };
  imageUrlValidationData = { isInvalid: false, errorMessage: '' };
  releaseDateValidationData = { isInvalid: false, errorMessage: '' };
  previewUrl: string | null = null;
  boundValidateForm!: () => void;

  constructor(private movieFormService: MovieFormService, private movieService: MovieService, private authService: AuthService,
    private router: Router, private activeRoute: ActivatedRoute, private toast: ToastService) { }

  ngOnInit(): void {
    this.boundValidateForm = this.validateForm.bind(this);
    this.editMovieForm = this.movieFormService.createForm();

    this.editMovieForm.statusChanges.subscribe(() => {
      this.validateForm();
    });

    this.movieId = this.activeRoute.snapshot.paramMap.get('id');

    this.movieService.getMovie(this.movieId).subscribe((movie: Movie) => {
      this.editMovieForm.patchValue({
        authorEmail: movie.authorEmail,
        title: movie.title,
        genre: movie.genre,
        description: movie.description,
        imageUrl: movie.imageUrl,
        releaseDate: movie.releaseDate
      });
      this.previewUrl = movie.imageUrl;
    });
  }

  validateForm(): void {
    this.titleValidationData = { ...this.movieFormService.titleValidator(this.editMovieForm) };
    this.genreValidationData = { ...this.movieFormService.genreValidator(this.editMovieForm) };
    this.descriptionValidationData = { ...this.movieFormService.descriptionValidator(this.editMovieForm) };
    this.imageUrlValidationData = { ...this.movieFormService.imageUrlValidator(this.editMovieForm) };
    this.releaseDateValidationData = { ...this.movieFormService.releaseDateValidator(this.editMovieForm) };
  }

  onFileChange(event: Event) {
    let input = event.target as HTMLInputElement;

    let file = input.files?.[0] || null;
    let imageUrlControl = this.editMovieForm.get('imageUrl');

    if (!file) {
      this.previewUrl = null;
      this.editMovieForm.patchValue({ imageUrl: null });
      imageUrlControl?.updateValueAndValidity({ emitEvent: true });
      input.blur();
      return;
    }

    let fileReader = new FileReader();

    fileReader.onload = (e) => {
      let dataUrl = e.target?.result as string;
      this.previewUrl = dataUrl;
      this.editMovieForm.patchValue({ imageUrl: dataUrl });

      imageUrlControl?.markAsDirty();
      imageUrlControl?.markAsTouched();
      imageUrlControl?.updateValueAndValidity({ emitEvent: true });
    };

    fileReader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.editMovieForm.invalid) {
      this.movieFormService.markFormAsTouched(this.editMovieForm);
      return;
    }

    let authorEmail = this.authService.currentUser()?.email;

    let { title, genre, description, imageUrl, releaseDate } = this.editMovieForm.value;

    this.movieService.editMovie(authorEmail, title, genre, description, imageUrl, releaseDate, this.movieId).subscribe({
      next: () => {
        this.router.navigate(['/movies', this.movieId]);
        this.toast.show('Movie was edited successfuly!', 'success');
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }
}

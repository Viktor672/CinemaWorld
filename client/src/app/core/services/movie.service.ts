import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ApiMovie } from "../../models/api-movie.model";
import { Movie } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private baseUrl = 'http://localhost:3030/data';

    constructor(private httpClient: HttpClient) { }

    getMovies(): Observable<Movie[]> {
        return this.httpClient.get<ApiMovie[]>(`${this.baseUrl}/movies`).pipe(map((apiMovieArr: ApiMovie[]) =>
            apiMovieArr.map((apiMovie: ApiMovie) =>
                this.mapApiMovieToMovie(apiMovie)
            )));
    }

    getMovie(id: string | null): Observable<Movie> {
        return this.httpClient.get<ApiMovie>(`${this.baseUrl}/movies/${id}`).pipe(map((apiMovie: ApiMovie) => this.mapApiMovieToMovie(apiMovie)));
    }

    addMovie(authorEmail: string | undefined, title: string, genre: string, description: string, imageUrl: string, releaseDate: Date): Observable<Movie> {
        let movie = {
            authorEmail,
            title,
            genre,
            description,
            img: imageUrl,
            releaseDate
        }

        return this.httpClient.post<ApiMovie>(`${this.baseUrl}/movies`, movie).pipe(map((apiMovie: ApiMovie) => this.mapApiMovieToMovie(apiMovie)));
    }

    editMovie(authorEmail: string | undefined, title: string, genre: string, description: string, imageUrl: string, releaseDate: Date, movieId: string | null): Observable<Movie> {
        let movie = {
            authorEmail,
            title,
            genre,
            description,
            img: imageUrl,
            releaseDate
        }

        return this.httpClient.put<ApiMovie>(`${this.baseUrl}/movies/${movieId}`, movie).pipe(map((apiMovie: ApiMovie) => this.mapApiMovieToMovie(apiMovie)));
    }

    deleteMovie(id: string | null): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}/movies/${id}`);
    }

    private mapApiMovieToMovie(apiMovie: ApiMovie): Movie {
        return {
            _ownerId: apiMovie._ownerId,
            authorEmail: apiMovie.authorEmail,
            title: apiMovie.title,
            description: apiMovie.description,
            imageUrl: apiMovie.img,
            genre: apiMovie.genre,
            releaseDate: apiMovie.releaseDate,
            _id: apiMovie._id
        }
    }
}
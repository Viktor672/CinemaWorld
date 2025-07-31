import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Movie } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private baseUrl = 'http://localhost:3030/data';

    constructor(private httpClient: HttpClient) { }

    getMovies(): Observable<Movie[]> {
        return this.httpClient.get<Movie[]>(`${this.baseUrl}/movies`);
    }
}
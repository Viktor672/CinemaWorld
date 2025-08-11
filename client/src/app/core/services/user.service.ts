import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { Like } from "../../models/like.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl: string = 'http://localhost:3030/data';

    constructor(private httpClient: HttpClient) { }

    like(ownerId: string | null, movieId: string | null): Observable<Like> {
        return this.httpClient.post<Like>(`${this.baseUrl}/likes`, { ownerId, movieId });
    }

    getLikes(movieId: string | null): Observable<number> {
        return this.httpClient.get<Like[]>(`${this.baseUrl}/likes`).pipe(map((response: Like[]) => {
            response = response.filter(curEl => curEl.movieId === movieId);

            return response.length;
        })
        );
    }
}
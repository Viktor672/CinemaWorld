import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { Like } from "../../models/like.model";
import { User } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl: string = 'http://localhost:3030';

    constructor(private httpClient: HttpClient) { }

    like(ownerId: string | null, movieId: string | null): Observable<Like> {
        return this.httpClient.post<Like>(`${this.baseUrl}/data/likes`, { ownerId, movieId });
    }

    getLikes(movieId: string | null): Observable<number> {
        return this.httpClient.get<Like[]>(`${this.baseUrl}/data/likes`).pipe(map((response: Like[]) => {
            response = response.filter(curEl => curEl.movieId === movieId);

            return response.length;
        })
        );
    }

    getUser(): Observable<User> {
        return this.httpClient.get<User>(`${this.baseUrl}/users/me`);
    }
}
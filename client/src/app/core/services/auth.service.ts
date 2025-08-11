import { Injectable, signal } from "@angular/core";
import { User } from "../../models";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl: string = 'http://localhost:3030/users';
    private _currentUser = signal<User | null>(null);

    public currentUser = this._currentUser.asReadonly();

    constructor(private httpClient: HttpClient) {
        let savedUser = localStorage.getItem('currentUser');

        if (savedUser) {
            this._currentUser.set(JSON.parse(savedUser));
        }
    }

    register(username: string, email: string, country: string, password: string, rePassword: string): Observable<User> {
        return this.httpClient.post<User>(`${this.baseUrl}/register`, {
            username,
            email,
            country,
            password,
            rePassword
        }).pipe(tap((newUser: User) => {
            this._currentUser.set(newUser);
            localStorage.setItem('currentUser', JSON.stringify(newUser));
        }));
    }

    login(email: string, password: string): Observable<User> {
        return this.httpClient.post<User>(`${this.baseUrl}/login`, {
            email,
            password
        }).pipe(tap((user: User) => {
            this._currentUser.set(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
        }));
    }

    logout(): void {
        this._currentUser.set(null);
        localStorage.removeItem('currentUser');
    }
}
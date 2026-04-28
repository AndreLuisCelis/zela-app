import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatar: string;
    balance: number;
    roles: string[];
  };
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Ajuste para sua URL
  private tokenKey = 'auth_token';
  private userKey = 'user_data';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  private currentUserSubject = new BehaviorSubject<any>(this.getUserFromStorage());

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    if (this.hasToken()) {
      this.refreshProfile().subscribe({
        error: (err) => console.error('Erro ao atualizar perfil na inicialização', err)
      });
    }
  }

  // Login
  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.setUser(response.user);
          this.isAuthenticatedSubject.next(true);
          this.currentUserSubject.next(response.user);
        }),
        catchError(error => {
          this.clearAuthData();
          return throwError(() => error);
        })
      );
  }

  // Registro
  register(userData: RegisterData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/register`, userData)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.setUser(response.user);
          this.isAuthenticatedSubject.next(true);
          this.currentUserSubject.next(response.user);
        }),
        catchError(error => {
          this.clearAuthData();
          return throwError(() => error);
        })
      );
  }

  // Logout
  logout(): void {
    this.clearAuthData();
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Refresh Profile
  refreshProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/me`).pipe(
      tap(response => {
        if (response && response.user) {
          // Precisamos adaptar os campos de _id para id para manter consistência com o login
          const userData = {
            id: response.user._id,
            name: response.user.name,
            email: response.user.email,
            avatar: response.user.avatar,
            balance: response.user.balance,
            roles: response.user.roles
          };
          this.updateUser(userData);
        }
      }),
      catchError(error => {
        // Se houver erro de autenticação (401), podemos deslogar, mas aqui só repassamos o erro
        if (error.status === 401) {
           this.logout();
        }
        return throwError(() => error);
      })
    );
  }

  // Verificar autenticação
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  get isAuthenticatedValue(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Obter usuário atual
  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Obter token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Verificar se token está prestes a expirar (opcional)
  isTokenExpiring(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000;
      const currentTime = Date.now();
      const bufferTime = 5 * 60 * 1000; // 5 minutos antes de expirar

      return expirationTime - currentTime < bufferTime;
    } catch {
      return true;
    }
  }

  // Atualizar dados do usuário
  updateUser(user: any): void {
    this.setUser(user);
    this.currentUserSubject.next(user);
  }

  // Métodos privados
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private setUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  private getUserFromStorage(): any {
    const userStr = localStorage.getItem(this.userKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }
}
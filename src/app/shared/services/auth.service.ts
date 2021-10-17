import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import { LoginResponseModel } from '../../model/responses/loginResponse.model';
import { UserInfo } from '../../model/userInfo.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  private apiBase = environment.apiBase; // URL to web api
  private userInfo: UserInfo | null = null;

  get isLoggedIn(): boolean {
    return !!this.getToken();
  }

  get user(): UserInfo | null {
    return this.userInfo;
  }

  constructor(protected httpClient: HttpClient, private router: Router) {
    this.setUser();
  }

  private setUser(): void {
    const token = this.getToken();
    if (token) {
      this.userInfo = jwtDecode(token);
    } else {
      this.userInfo = null;
    }
  }

  /**
   * save token to local storage
   * @param resp login response
   */
  private saveToken(resp: LoginResponseModel): void {
    localStorage.setItem('token', resp.token);
    this.setUser();
  }

  /**
   * retrieve token from local storage
   * @returns token
   */
  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * user login
   * @param username username
   * @param password password
   * @param server server name
   * @param dbName database name
   * @returns token if success
   */
  public login(username: string, password: string, server: string, dbName: string): Observable<LoginResponseModel> {
    return this.httpClient
      .post<LoginResponseModel>(this.apiBase + 'auth/login', {
        username,
        password,
        server,
        dbName
      })
      .pipe(take(1), tap(this.saveToken.bind(this)));
  }

  /**
   * user logout
   */
  public logout(): void {
    localStorage.removeItem('token');
    this.setUser();
    this.router.navigate(['/login-page']);
  }
}

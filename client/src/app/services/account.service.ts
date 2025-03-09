import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Address, User } from '../shared/models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);

  login(values: any) {
    console.log('🔵AccountService → login() →', values);

    let params = new HttpParams();
    params = params.append('useCookies', true);
    return this.http.post<User>(this.baseUrl + 'login', values, { params });
  }

  register(values: any) {
    return this.http.post(this.baseUrl + 'account/register', values);
  }

  getUserInfo() {
    return this.http.get<User>(this.baseUrl + 'account/user-info').pipe(
      map((user) => {
        console.log('🟢AccountService → getUserInfo() → map → user => ', user);
        this.currentUser.set(user);
        console.log('🟢AccountService → getUserInfo() → map → currentUser() => ', this.currentUser());
        return user;
      })
    );
  }

  logout() {
    return this.http.post(this.baseUrl + 'account/logout', {});
  }

  updateAddress(address: Address) {
    return this.http.post(this.baseUrl + 'account/address', address);
  }

  getAuthState() {
    return this.http.get<{ isAuthenticated: boolean }>(
      this.baseUrl + 'account/auth-status'
    );
  }
}

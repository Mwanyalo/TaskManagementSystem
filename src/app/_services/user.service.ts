import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { appConfig } from '../app.config';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post<User>(appConfig.apiUrl + 'users', user).pipe(
      map(data => {
        // login successful if there's a jwt token in the response
        if (data) {
          localStorage.setItem('userId', JSON.stringify(data));
          return data;
        } else {
          return 'Error no user found or created';
        }
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('userId');
  }
}

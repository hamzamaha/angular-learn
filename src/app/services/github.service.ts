import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('https://api.github.com/users');
  }

  searchUser(q: string) {
    return this.http.get(`https://api.github.com/search/users?q=${q}`);
  }

  getlogin(log: string) {
    return this.http.get(`https://api.github.com/users/${log}`);
  }

  getRepo(log: string) {
    return this.http.get(`https://api.github.com/users/${log}/repos`);
  }
  getFollowers(log: string) {
    return this.http.get(`https://api.github.com/users/${log}/followers`);
  }
}

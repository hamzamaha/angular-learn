import { User } from './../models/user';

import { ActivatedRoute } from '@angular/router';
import { GithubService } from './../services/github.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService
  ) {}
  myUser: any = {};
  repo: any = [];
  followers: any = [];

  ngOnInit(): void {
    this.route.params.subscribe((param: any) => this.getlog(param.login));
    this.route.params.subscribe((param: any) => this.getRepo(param.login));
    this.route.params.subscribe((param: any) => this.getFollow(param.login));
  }
  getlog(log: any) {
    this.githubService
      .getlogin(log)
      .subscribe((response) => (this.myUser = response));
  }
  getRepo(log: any) {
    this.githubService
      .getRepo(log)
      .subscribe((response) => (this.repo = response));
  }

  getFollow(log: any) {
    this.githubService
      .getFollowers(log)
      .subscribe((res) => (this.followers = res));
  }
}

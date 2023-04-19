import { FormControl, FormGroup, UntypedFormControl } from '@angular/forms';
import { Article } from './../models/article';
import { ArticleService } from './../services/article.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  constructor(private articleService: ArticleService) {}

  articleForm = new FormGroup({
    title: new UntypedFormControl(''),
    content: new UntypedFormControl(''),
  });

  articles: Article[] = [];
  editable: boolean = false;
  list: boolean = true;
  showForm: boolean = false;

  toggleForm() {
    this.showForm = !this.showForm;
  }

  switch(state: boolean) {
    this.list = state;
  }

  myArticle: Article = {
    title: '',
    content: '',
  };

  initArticle() {
    this.myArticle = {
      title: '',
      content: '',
    };
  }

  log(myTitle: any) {
    console.log(myTitle);
  }

  saveArticle(form: any) {
    if (form.invalid) {
      alert('please verify the content on the form');
      return;
    }
    let { title, content } = form.value;
    this.articleService
      .persistArticle({ title, content })
      .subscribe((response) => {
        this.articles = [response, ...this.articles];
        this.initArticle();
      });
  }

  editArticle(data: Article) {
    this.myArticle = data;
    this.editable = true;
  }

  updateArticle() {
    let { id, title, content } = this.myArticle;
    this.articleService
      .putArticle(id, { title, content })
      .subscribe((response) => {
        this.editable = false;
        this.initArticle();
      });
  }

  destroyArticle(id: number | undefined) {
    if (!confirm('are you sure you want to delete this article')) {
      return;
    }

    this.articleService.deleteArticle(id).subscribe(() => {
      this.articles = this.articles.filter((article) => article.id !== id);
    });
  }

  ngOnInit(): void {
    this.articleService
      .getArticles()
      .subscribe((response) => (this.articles = response));
  }
}

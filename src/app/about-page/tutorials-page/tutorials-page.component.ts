import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArticleData} from '../../article/article.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tutorials-page',
  templateUrl: './tutorials-page.component.html',
  styleUrls: ['./tutorials-page.component.css']
})
export class TutorialsPageComponent implements OnInit {
  articles: ArticleData[] = [];

  selectedArticle: ArticleData;

  // tslint:disable-next-line:variable-name
  private _selectedArticleId = -1;

  set selectedArticleId(val: number) {
    console.log(`selecting article ${val}`);
    this._selectedArticleId = val;
    if (val >= 0 && val < this.articles.length) {
      this.selectedArticle = this.articles[val];
    }
  }

  get selectedArticleId() {
    return this._selectedArticleId;
  }

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const selectedID = this.route.snapshot.paramMap.get('id');
    if (selectedID) {
      this.selectedArticleId = Number(selectedID);
    }
    this.http.get<ArticleData[]>('/api/tutorial/list').subscribe(articles => {
      articles.forEach((article: ArticleData, i: number) => {
        article.text = `/api/tutorial/${i}`;
        articles[i] = article;
      });
      this.articles = articles;
      this.selectedArticleId = this.selectedArticleId;
    });
  }

  openArticle(index: number) {
    this.router.navigate([`/tutorials/${index}`]).then(() =>  this.selectedArticleId = index);
  }
}

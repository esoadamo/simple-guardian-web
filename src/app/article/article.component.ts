import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  private _articleData: ArticleData = null;

  @Input()
  set articleData(value: ArticleData) {
    console.log('new article');
    this._articleData = value;
    this.text = '*Loading...*';
    if (this._articleData.text) {
      this.http.get(this._articleData.text, {responseType: 'text'}).subscribe(text => {
        this.text = text;
        console.log(this.text);
      });
    }
  }

  get articleData() {
    return this._articleData;
  }

  text = '*Loading...*';

  constructor(private http: HttpClient, public sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}

export class ArticleData {
  text: string;
  video: string;
  title: string;
}

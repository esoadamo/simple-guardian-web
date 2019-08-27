import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArticleData} from '../../article/article.component';
import {ActivatedRoute, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-tutorials-page',
  templateUrl: './tutorials-page.component.html',
  styleUrls: ['./tutorials-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openClose', [
      state('open', style({
        left: '0',
      })),
      state('closed', style({
        left: '-290px',
      })),
      transition('open => closed', [
        animate('0.3s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
    trigger('openCloseArrow', [
      state('open', style({
        left: '280px',
      })),
      state('closed', style({
        left: '-20px',
      })),
      transition('open => closed', [
        animate('0.3s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
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

  modeMobile = false;
  isOpen = true;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkMobileMode();
  }


  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef) { }

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
      this.cd.markForCheck();
    });
    this.checkMobileMode();
  }

  private checkMobileMode() {
    const previousMode = this.modeMobile;
    this.modeMobile = window.document.body.getBoundingClientRect().width < 1100;
    if (previousMode === this.modeMobile) {
      return;
    }
    this.isOpen = !this.modeMobile;
  }

  openArticle(index: number) {
    this.router.navigate([`/tutorials/${index}`]).then(() =>  this.selectedArticleId = index);
    this.cd.markForCheck();
  }
}

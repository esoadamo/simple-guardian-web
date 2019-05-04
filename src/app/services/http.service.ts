import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  API_SERVER = 'http://localhost:5000/';

  private authSecretVar = '';

  constructor(private http: HttpClient, private router: Router) {
    this.authSecret = localStorage.getItem('authSecret') || '';
  }

  set authSecret(val: string) {
    this.authSecretVar = val;
    localStorage.setItem('authSecret', val);
  }

  get(url: string): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('sg-auth', this.authSecretVar);

    return new Observable((observer) => {

      this.http.get<ApiResponse>(`${this.API_SERVER}/${url}`, {headers}).subscribe(resp => {
        if (resp.status === 'needsLogin') {
          // noinspection JSIgnoredPromiseFromCall
          this.router.navigate(['/login']);
          observer.next(null);
        }

        observer.next(resp.message);
      });
    });
  }

  post(url: string, data: any): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('sg-auth', this.authSecretVar);

    return new Observable((observer) => {

      this.http.post<ApiResponse>(`${this.API_SERVER}/${url}`, data, {headers}).subscribe(resp => {
        if (resp.status === 'needsLogin') {
          console.log('needsLogin');
          // noinspection JSIgnoredPromiseFromCall
          this.router.navigate(['/login']);
          observer.next(null);
        }

        observer.next(resp.message);
      });
    });
  }
}

interface ApiResponse {
  status: string;
  message: any;
}

import {ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../services/http.service';
import {BalloonMessageFactoryService} from '../../balloon-message/balloon-message-factory.service';
import {PasswordCheckComponent} from './password-check.component';

@Injectable({
  providedIn: 'root'
})
export class PasswordCheckService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector,
              private http: HttpService,
              private balloon: BalloonMessageFactoryService) {
  }


  show(): Observable<boolean> {
    return new Observable(observer => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PasswordCheckComponent);
      const componentRef = componentFactory.create(this.injector);
      this.appRef.attachView(componentRef.hostView);
      const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);

      componentRef.instance.submitted.subscribe((password) => {
        if (!password) {
          this.appRef.detachView(componentRef.hostView);
          componentRef.destroy();
          observer.next(false);
        } else {
          this.http.checkPassword(password).subscribe(passwordGood => {
            if (passwordGood) {
              this.appRef.detachView(componentRef.hostView);
              componentRef.destroy();
              observer.next(true);
            } else {
              this.balloon.show('Wrong password', 'error');
            }
          });
        }
      });
    });
  }
}

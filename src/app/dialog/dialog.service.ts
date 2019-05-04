import {ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {DialogComponent} from './dialog.component';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) {
  }

  show(question: string, respond = ''): Observable<string | null> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    const componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);
    componentRef.instance.question = question;
    componentRef.instance.respond = respond;
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    const submittedRespond = componentRef.instance.submitted;

    submittedRespond.subscribe(() => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    });

    return submittedRespond;
  }
}

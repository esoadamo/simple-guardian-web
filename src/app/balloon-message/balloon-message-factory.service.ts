import {ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {BalloonMessageComponent} from './balloon-message.component';

@Injectable({
  providedIn: 'root'
})
export class BalloonMessageFactoryService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) {
  }

  show(text: string, level = 'info') {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BalloonMessageComponent);
    const componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);
    componentRef.instance.message = text;
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    domElem.classList.add(level);
    document.body.appendChild(domElem);
  }
}

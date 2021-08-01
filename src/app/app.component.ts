import {
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TreeItemComponent } from './tree-item/tree-item.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('placeholder', { read: ViewContainerRef, static: true })
  public placeholder!: ViewContainerRef;
  data = {
    name: 'ROOT',
    children: [
      {
        name: 'ROOT-1',
        children: [
          { name: 'CHILD-CHILD-1', children: [{ name: 'inner-1', children: [
            { name: 'children of inner', children: [] },
            { name: 'children of inner', children: [] }
          ] },] },
          { name: 'CHILD-CHILD-2', children: [] },
        ],
      },
      {
        name: 'ROOT-2',
        children: [{ name: 'CHILD-CHILD-1111', children: [] }],
      },
      { name: 'ROOT-3', children: [] },
    ],
  };
  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(TreeItemComponent);

    const generateTree = (node: any, arrWithChildren: any = [] ) => {
      const component = factory.create(this.injector);
      component.instance.data = node;

      node.children.forEach((element: any) => {
        arrWithChildren.push(generateTree(element))
      });

      component.instance.inputComponents = [...arrWithChildren];
      this.placeholder.insert(component.hostView);
      return component
    }
    generateTree(this.data)
  }
}

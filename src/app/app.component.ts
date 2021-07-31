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
        name: 'CHILD-1',
        children: [
          { name: 'CHILD-CHILD-1', children: [] },
          { name: 'CHILD-CHILD-2', children: [] },
        ],
      },
      { name: 'CHILD-2', children: [{ name: 'CHILD-CHILD-1', children: [] }] },
      { name: 'CHILD-3', children: [] },
    ],
  };
  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(TreeItemComponent);

    // const rootComponent = factory.create(this.injector);
    // rootComponent.instance.data = this.data;

    const createTree = (node: any) => {
      // const rootComponent = factory.create(this.injector);
      // rootComponent.instance.data = node;
      // const arr: any = []
      if (node.children.length === 0) {
        const component = factory.create(this.injector);
        component.instance.data = node;
        return component;
      } else {
        let arr: any = [];
        node.children.forEach((element: any) => {
          arr.push(createTree(element));
        });
        // console.log(arr)
        return arr;
      }
      // if (node.children.length) {
      //   node.children.forEach((element: any) => {
      // const component = factory.create(this.injector);
      // component.instance.data = element;
      //     arr.push(component);
      //   });
      // }

      // rootComponent.instance.inputComponents = [...arr];
      // return rootComponent
    };

    console.log(createTree(this.data));
    this.generateTree();
  }

  generateTree() {
    const factory = this.resolver.resolveComponentFactory(TreeItemComponent);
    const rootComponent = factory.create(this.injector);
    rootComponent.instance.data = this.data;
    const rootArr: any[] = [];

    if (this.data.children.length) {
      this.data.children.forEach((item: any) => {
        const component = factory.create(this.injector);
        component.instance.data = item;
        const arr: any[] = [];
        rootArr.push(component);

        if (item.children.length) {
          item.children.forEach((element: any) => {
            const component = factory.create(this.injector);
            component.instance.data = element;
            arr.push(component);
          });
        }
        component.instance.inputComponents = [...arr];
      });
    }
    rootComponent.instance.inputComponents = [...rootArr];
    this.placeholder.insert(rootComponent.hostView);
  }
}

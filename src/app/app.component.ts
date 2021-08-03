import {
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { treeData } from './tree-data';
import { TreeItemComponent } from './tree-item/tree-item.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('placeholder', { read: ViewContainerRef, static: true })
  public placeholder!: ViewContainerRef;

  userInput: any = JSON.stringify(treeData, undefined, 3);
  treeData = treeData

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngOnInit() {
    const rootComponent = this.createTree(treeData)
    this.placeholder.insert(rootComponent.hostView);
  }

  onClick() {
    try {
      this.placeholder.clear();
      const data = JSON.parse(this.userInput);
      
      const rootComponent = this.createTree(data)
      this.placeholder.insert(rootComponent.hostView)
    } catch {
      alert('JSON parse error');
    }
  }

  createTree(node: any, arrWithChildren: any = []) {
    const factory = this.resolver.resolveComponentFactory(TreeItemComponent);
    const component = factory.create(this.injector);
    component.instance.data = node;

    if (node.children.length > 0) {
      node.children.forEach((element: any) => {
        arrWithChildren.push(this.createTree(element));
      });
    }

    component.instance.inputComponents = [...arrWithChildren];
    return component;
  }
}

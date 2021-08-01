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
    this.createTree(treeData)
  }

  onClick() {
    try {
      this.placeholder.clear();
      const data = JSON.parse(this.userInput);
      this.treeData = data
      this.createTree(this.treeData);
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

    // Insert tree only when it is last iteration
    if(node.name === this.treeData.name) {
      this.placeholder.insert(component.hostView);
    }

    return component;
  }
}

import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss']
})
export class TreeItemComponent implements OnInit {
  @ViewChild('placeholder', { read: ViewContainerRef, static: true })
  public placeholder!: ViewContainerRef;
  @Input() data: any;
  @Input() inputComponents: any = [];
  isHidden = false;
  constructor() { }

  ngOnInit(): void {
    if (this.placeholder && this.inputComponents && this.inputComponents.length) {
      this.inputComponents.forEach((element: any) => {
        this.placeholder.insert(element.hostView)
      });
    } 
  }

  onClick() {
    this.isHidden = !this.isHidden
  }
}

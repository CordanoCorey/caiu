import { Component, OnInit, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Component({
  selector: 'iu-grid-cell',
  templateUrl: './grid-cell.component.html',
  styleUrls: ['./grid-cell.component.scss']
})
export class GridCellComponent implements OnInit {

  @Input() dataItem: any;
  @Input() templateRef: TemplateRef<any>;

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.templateRef, this.dataItem);
  }

}

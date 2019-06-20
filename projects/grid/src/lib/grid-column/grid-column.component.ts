import { Component, ElementRef, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

import { GridColumn } from './grid-column.model';

@Component({
  selector: 'iu-grid-column',
  templateUrl: './grid-column.component.html',
  styleUrls: ['./grid-column.component.scss']
})
export class GridColumnComponent {

  @Input() model: GridColumn<any>;
  @Input() templateRef: TemplateRef<any>;
  @Input() class: string | string[];
  @Input() editable = true;
  @Input() editor: string | number | Date | boolean;
  @Input() field = '';
  @Input() filter: 'text' | 'numeric' | 'date' | 'boolean' = 'text';
  @Input() filterable = true;
  @Input() footerClass: string | string[] | { [key: string]: any };
  @Input() footerStyle: { [key: string]: string };
  @Input() format: string;
  @Input() headerClass: string | string[] | { [key: string]: any };
  @Input() headerStyle: { [key: string]: string };
  @Input() hidden = false;
  @Input() locked = false;
  @Input() media: string;
  @Input() sortable = true;
  @Input() style: { [key: string]: string };
  @Input() title: string;
  @Input() width: number;
  @ViewChild('content', {static: true}) content: ElementRef;

  constructor(public view: ViewContainerRef) { }

  get colField(): string {
    return this.model.metadata.name;
  }

  get colTitle(): string {
    return this.model.title;
  }

  get colWidth(): number {
    return this.model.width;
  }

}

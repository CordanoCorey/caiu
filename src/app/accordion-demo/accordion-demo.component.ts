import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from '@angular/material/tree';
import { AccordionComponent } from 'library';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }]
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussel sprouts' }]
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }]
      }
    ]
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'docs-accordion-demo',
  templateUrl: './accordion-demo.component.html',
  styleUrls: ['./accordion-demo.component.scss'],
  animations: [
    trigger('toggle', [
      state('show', style({})),
      state('hide', style({ transform: 'rotate(180deg)' })),
      transition('show <=> hide', [animate('300ms ease-out')])
    ]),
    trigger('toggleQuickItem', [
      state('show', style({ height: '50px' })),
      state('hide', style({ height: '0px' })),
      transition('show <=> hide', [animate('300ms ease-out')])
    ])
  ]
})
export class AccordionDemoComponent implements OnInit {
  @Input() opened = true;
  @ViewChild(AccordionComponent) accordion: AccordionComponent;

  transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit() {}

  onStart(e: any) {}

  onDone(e: any) {
    if (this.opened) {
      this.accordion.open();
    } else {
      this.accordion.close();
    }
  }

  toggle() {
    this.opened = !this.opened;
  }
}

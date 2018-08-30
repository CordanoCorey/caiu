import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Address } from '../../../shared/models';

@Component({
  selector: 'iu-inline-address',
  templateUrl: './inline-address.component.html',
  styleUrls: ['./inline-address.component.scss']
})
export class InlineAddressComponent implements OnInit {

  @Input() address: Address;
  @Input() canActivate = false;
  @Input() canDelete = false;
  @Input() canEdit = false;
  @Output() activate = new EventEmitter<Address>();
  @Output() delete = new EventEmitter<Address>();
  @Output() edit = new EventEmitter<Address>();

  constructor() { }

  get isPrimary(): boolean {
    return this.address.isPrimaryAddress;
  }

  ngOnInit() {
  }

  onActivate() {
    this.activate.emit(this.address);
  }

  onDelete() {
    this.delete.emit(this.address);
  }

  onEdit() {
    this.edit.emit(this.address);
  }

}

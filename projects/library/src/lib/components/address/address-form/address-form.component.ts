import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Control } from '../../../forms/forms.decorators';
import { Address } from '../../../shared/models';

@Component({
  selector: 'iu-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  @Control(Address) form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}

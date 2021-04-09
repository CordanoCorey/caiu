import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FileUpload } from '../file-upload.model';
import { guid } from '../../../shared/utils';

@Component({
  selector: 'iu-file-control',
  templateUrl: './file-control.component.html',
  styleUrls: ['./file-control.component.scss']
})
export class FileControlComponent implements OnInit {
  @Input() id = `files-${guid()}`;
  @Input() debug = false;
  @Input() maxFileSize = 97000000;
  @Input() multiple = false;
  @Input() ordered = true;
  @Input() preview = true;
  @Input() isPrivateMessage = '';
  @Output() upload = new EventEmitter<FileUpload | FileUpload[]>();
  @Output() delete = new EventEmitter<FileUpload>();

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'iu-auto-logout',
  templateUrl: './auto-logout.component.html',
  styleUrls: ['./auto-logout.component.scss']
})
export class AutoLogoutComponent implements OnInit {
  seconds = 30;

  constructor(public dialogRef?: MatDialogRef<AutoLogoutComponent>) {}

  ngOnInit() {
    setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        this.logout();
      }
    }, 1000);
  }

  close() {
    if (this.dialogRef && this.dialogRef.close) {
      this.dialogRef.close();
    }
  }

  logout() {
    if (this.dialogRef && this.dialogRef.close) {
      this.dialogRef.close(true);
    }
  }
}

import { OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { getValue } from '../shared/utils';

export class DumbComponent implements OnDestroy {

    dialogRef: Subscription;
    form: FormGroup;
    subscriptions: Subscription[] = [];

    constructor() {
    }

    ngOnDestroy() {
        this.removeSubscriptions();
    }

    subscribe(subscriptions: Subscription[]) {
        subscriptions.forEach(s => {
            this.addSubscription(s);
        });
    }

    addSubscription(subscription: Subscription) {
        this.subscriptions.push(subscription);
    }

    removeSubscriptions() {
        this.subscriptions.forEach(s => {
            s.unsubscribe();
        });
    }

    setValue(value: any) {
        if (this.form && this.form.setValue) {
            this.form.setValue(getValue(value));
        }
    }

}

export class FormComponent extends DumbComponent {

    form: FormGroup;

    markAsSubmitted() {
        this.form.markAsTouched();
        Object.keys(this.form.controls).forEach(key => {
            this.form.controls[key].markAsTouched();
        });
    }

}

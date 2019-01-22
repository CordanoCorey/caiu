import { OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Store, Action } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { HasId } from './models';
import { getValue, truthy } from './utils';

export class DumbComponent implements OnDestroy {

    dialog: MatDialog;
    dialogRef: Subscription;
    form: FormGroup;
    requestState: 'DEFAULT' | 'SUCCESS' | 'ERROR' = 'DEFAULT';
    subscriptions: Subscription[] = [];

    constructor() {
    }

    get inErrorState(): boolean {
        return this.requestState === 'ERROR';
    }

    get inSuccessState(): boolean {
        return this.requestState === 'SUCCESS';
    }

    get message(): string {
        return this.inErrorState ? `An error has occurred. Please try again later.`
            : this.inSuccessState ? `Saved successfully!` : '';
    }

    get showMessage(): boolean {
        return this.inErrorState || this.inSuccessState;
    }

    ngOnDestroy() {
        this.removeSubscriptions();
    }

    addSubscription(subscription: Subscription) {
        this.subscriptions.push(subscription);
    }

    closeDialog(result: any) {
        this.dialogRef.unsubscribe();
    }

    openDialog(component: any, config = {}) {
        const dialogRef = this.dialog.open(component, config);
        this.dialogRef = dialogRef.afterClosed().subscribe(result => {
            this.closeDialog(result);
        });
    }

    playAudioElement(tag: string) {
        const el = document.getElementById(tag);
        if (el && typeof el['play'] === 'function') {
            el['play']();
        }
    }

    playAudioFile(file: string) {
        const audio = new Audio(file);
        audio.play();
    }

    removeSubscriptions() {
        this.subscriptions.forEach(s => {
            s.unsubscribe();
        });
    }

    subscribe(subscriptions: Subscription[]) {
        subscriptions.forEach(s => {
            this.addSubscription(s);
        });
    }

    flashErrorMessage(duration = 5000) {
        this.toErrorState();
        setTimeout(() => {
            this.resetRequestState();
        }, duration);
    }

    flashSuccessMessage(duration = 5000) {
        this.toSucessState();
        setTimeout(() => {
            this.resetRequestState();
        }, duration);
    }

    onError(e: any) {
        this.flashErrorMessage();
    }

    onSuccess(e: any) {
        this.flashSuccessMessage();
    }

    resetRequestState() {
        this.requestState = 'DEFAULT';
    }

    setValue(value: any) {
        if (this.form && this.form.setValue) {
            this.form.setValue(getValue(value));
        }
    }

    toErrorState() {
        this.requestState = 'ERROR';
    }

    toSucessState() {
        this.requestState = 'SUCCESS';
    }

}

export class FormComponent extends DumbComponent {

    form: FormGroup;
    model: HasId;

    get editing(): boolean {
        return truthy(this.id);
    }

    get id(): number | string {
        return this.model.id;
    }

    get isValid(): boolean {
        return this.form.valid;
    }

    getControl(key: string): AbstractControl {
        return this.form.controls[key];
    }

    getControlValue(key: string, defaultValue: any): any {
        return this.form.value[key] || defaultValue;
    }

    getControlValueChanges(key: string, fn: (value: any) => void): Subscription {
        const control = this.getControl(key);
        return control.valueChanges.subscribe(fn);
    }

    getValue(defaultValue = null): any {
        return this.form.value || defaultValue;
    }

    getValueChanges(fn: (value: any) => void): Subscription {
        return this.form.valueChanges.subscribe(fn);
    }

    markAsSubmitted(): void {
        this.form.markAsTouched();
        Object.keys(this.form.controls).forEach(key => {
            this.form.controls[key].markAsTouched();
        });
    }

    setControlValue(key: string, value: any): void {
        const control = this.getControl(key);
        control.setValue(value);
    }

    subscribeToChanges(key: string, fn: (value: any) => void) {
        this.addSubscription(this.getValueChanges(fn));
    }

    subscribeToControlChanges(key: string, fn: (value: any) => void) {
        this.addSubscription(this.getControlValueChanges(key, fn));
    }

}

export class SmartComponent extends DumbComponent {

    events;

    constructor(public store: Store<any>) {
        super();
    }

    dispatch(action: Action) {
        this.store.dispatch(action);
    }

    dispatchAndSubscribe(action: Action, onSuccess?: (e: any) => void, onError?: (e: any) => void) {
        const f1 = onSuccess ? onSuccess : e => {
            this.flashSuccessMessage();
        };

        const f2 = onError ? onError : e => {
            this.flashErrorMessage();
        };

        if (this.events && this.events.dispatch) {
            this.addSubscription(this.events.dispatch(action).subscribe(f1, f2));
        } else {
            this.store.dispatch(action);
        }
    }

}

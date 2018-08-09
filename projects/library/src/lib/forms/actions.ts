import { AbstractControl, Form } from '@angular/forms';

import { Action } from '../store/models';

export class FormActions {
    static ADD = '[forms] Add Form';
    static RESET = '[forms] Reset Forms';
    static NAVIGATE = '[forms] Navigate to Form';
    static STATUS_CHANGES = '[form] Status Changes';
    static VALUE_CHANGES = '[form] Value Changes';

    static addForm(control: AbstractControl): Action {
        return {
            type: FormActions.ADD,
            payload: control
        };
    }

    static changeStatus(control: AbstractControl, changes: any): Action {
        return {
            type: FormActions.STATUS_CHANGES,
            payload: {
                control: control,
                changes: changes
            }
        };
    }

    static changeValue(control: AbstractControl, changes: any): Action {
        return {
            type: FormActions.VALUE_CHANGES,
            payload: {
                control: control,
                changes: changes
            }
        };
    }

    static navigateToForm(route: string): Action {
        return {
            type: FormActions.NAVIGATE,
            payload: route
        };
    }

    static resetForms(forms: Form[]): Action {
        return {
            type: FormActions.RESET,
            payload: forms
        };
    }

}

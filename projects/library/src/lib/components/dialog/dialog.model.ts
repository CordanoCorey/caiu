import { ViewContainerRef } from '@angular/core';
import { MatDialogConfig, DialogPosition, DialogRole } from '@angular/material/dialog';

export class DialogModel {
    title = ' ';
    actions: DialogAction[] = [];
    /** Height of the dialog. */
    height?: string;
    /** Width of the dialog. */
    width?: string;
    /**
     * Where the attached component should live in Angular's *logical* component tree.
     * This affects what is available for injection and the change detection order for the
     * component instantiated inside of the dialog. This does not affect where the dialog
     * content will be rendered.
     */
    viewContainerRef?: ViewContainerRef;
    /** The ARIA role of the dialog element. */
    role?: DialogRole;
    /** Custom class for the overlay pane. */
    panelClass?: string;
    /** Whether the dialog has a backdrop. */
    hasBackdrop?= true;
    /** Custom class for the backdrop, */
    backdropClass?: string;
    /** Whether the user can use escape or clicking outside to close a modal. */
    disableClose?= false;
    /** Position overrides. */
    position?: DialogPosition;
    /** Data being injected into the child component. */
    data?: any;
    /** Layout direction for the dialog's content. */
    direction?: 'ltr' | 'rtl';

    get config(): MatDialogConfig {
        return {
            viewContainerRef: this.viewContainerRef,
            role: this.role,
            panelClass: this.panelClass,
            hasBackdrop: this.hasBackdrop,
            backdropClass: this.backdropClass,
            disableClose: this.disableClose,
            width: this.width,
            height: this.height,
            position: this.position,
            data: this.data,
            direction: this.direction
        };
    }
}

export class DialogAction {
    value: any = null;
    label = '';
    color: 'primary' | 'accent' | 'warn' = 'accent';
}

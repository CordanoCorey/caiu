import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { authenticatedSelector } from '../../store/selectors';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

    authenticated$: Observable<boolean>;

    constructor(public store: Store<any>) {
        this.authenticated$ = authenticatedSelector(this.store);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.authenticated$;
    }

}

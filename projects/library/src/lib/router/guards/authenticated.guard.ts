import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RouterService } from '../router.service';
import { loggedInSelector } from '../../store/selectors';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  authenticated = false;

  constructor(public store: Store<any>, public routerService: RouterService) {
    loggedInSelector(store).subscribe(x => {
      this.authenticated = x;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (!this.authenticated) {
      this.routerService.navigate([`/login`]);
    }
    return true;
  }

}

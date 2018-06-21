import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Error } from './errors.models';
import { Dictionary } from '../shared/models';

export function errorsSelector(store: Store<any>): Observable<Dictionary<Error>> {
    return store.select(s => s['errors']);
}

export function errorSelector(store: Store<any>, key: string): Observable<Error> {
    return errorsSelector(store).pipe(map(errors => errors[key]));
}

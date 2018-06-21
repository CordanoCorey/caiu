import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorsService implements ErrorHandler {

  constructor() { }

  handleError(error) {
    alert(error);
    // IMPORTANT: Rethrow the error otherwise it gets swallowed
    throw error;
  }

}

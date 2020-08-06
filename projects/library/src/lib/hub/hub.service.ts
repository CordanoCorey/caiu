import { Injectable, Inject } from '@angular/core';
import * as signalR from '@Microsoft/signalr';
import { Store } from '@ngrx/store';

import { SOCKET_URL } from './hub.module';

@Injectable({
  providedIn: 'root'
})
export class HubService {

  private hubConnection: signalR.HubConnection;

  constructor(public store: Store<any>, @Inject(SOCKET_URL) url: string) {
    this.startConnection(url);
  }

  startConnection(url: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(url)
      .build();

    this.hubConnection.start();

    return this.hubConnection;
  }

  addEffect(channel: string, action: string) {
    this.hubConnection.on(channel, (payload) => {
      console.dir(payload);
      this.store.dispatch({
        type: action,
        payload
      });
    });
  }

  addListener(functionName: string, func: Function) {
    this.hubConnection.on(functionName, (data) => func(data));
  }
}

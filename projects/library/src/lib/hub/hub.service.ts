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
      .withUrl(url, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection.start();

    return this.hubConnection;
  }

  addEffect(channel: string, action: string) {
    this.removeEffect(channel); // make sure no existing streams exist for this channel
    this.hubConnection.on(channel, (payload) => {
      this.store.dispatch({
        type: action,
        payload
      });
    });
  }

  removeEffect(channel: string) {
    this.hubConnection.off(channel);
  }

  addListener(functionName: string, func: Function) {
    this.hubConnection.on(functionName, (data) => func(data));
  }
}

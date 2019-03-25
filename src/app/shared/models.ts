import { Audited, build, Metadata } from 'library';

export class ExampleForm {}

export const environment = {
  apiBaseUrl: 'https://jsonplaceholder.typicode.com',
  // apiBaseUrl: 'http://localhost:5000/api',
  dev: false,
  test: false,
  demo: false,
  staging: false,
  production: false
};

export class AuditHistoryRow extends Audited {
  get metadata(): Metadata {
    return build(Metadata, {
      history: ['id', 'title', 'body']
    });
  }
}

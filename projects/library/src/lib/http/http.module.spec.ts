import { HttpModule } from './http.module';

describe('HttpModule', () => {
  let httpModule: HttpModule;

  beforeEach(() => {
    httpModule = new HttpModule();
  });

  it('should create an instance', () => {
    expect(httpModule).toBeTruthy();
  });
});

import { RouterModule } from './router.module';

describe('RouterModule', () => {
  let routerModule: RouterModule;

  beforeEach(() => {
    routerModule = new RouterModule();
  });

  it('should create an instance', () => {
    expect(routerModule).toBeTruthy();
  });
});

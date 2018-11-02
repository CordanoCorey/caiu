import { SidenavModule } from './sidenav.module';

describe('SidenavModule', () => {
  let sidenavModule: SidenavModule;

  beforeEach(() => {
    sidenavModule = new SidenavModule();
  });

  it('should create an instance', () => {
    expect(sidenavModule).toBeTruthy();
  });
});

import { BreadcrumbsModule } from './breadcrumbs.module';

describe('BreadcrumbsModule', () => {
  let breadcrumbsModule: BreadcrumbsModule;

  beforeEach(() => {
    breadcrumbsModule = new BreadcrumbsModule();
  });

  it('should create an instance', () => {
    expect(breadcrumbsModule).toBeTruthy();
  });
});

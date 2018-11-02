import { ContainerModule } from './container.module';

describe('ContainerModule', () => {
  let containerModule: ContainerModule;

  beforeEach(() => {
    containerModule = new ContainerModule();
  });

  it('should create an instance', () => {
    expect(containerModule).toBeTruthy();
  });
});

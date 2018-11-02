import { SocialIconsModule } from './social-icons.module';

describe('SocialIconsModule', () => {
  let socialIconsModule: SocialIconsModule;

  beforeEach(() => {
    socialIconsModule = new SocialIconsModule();
  });

  it('should create an instance', () => {
    expect(socialIconsModule).toBeTruthy();
  });
});

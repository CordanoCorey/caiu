import { WallpaperModule } from './wallpaper.module';

describe('WallpaperModule', () => {
  let wallpaperModule: WallpaperModule;

  beforeEach(() => {
    wallpaperModule = new WallpaperModule();
  });

  it('should create an instance', () => {
    expect(wallpaperModule).toBeTruthy();
  });
});

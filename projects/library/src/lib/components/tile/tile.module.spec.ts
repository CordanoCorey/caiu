import { TileModule } from './tile.module';

describe('TileModule', () => {
  let tileModule: TileModule;

  beforeEach(() => {
    tileModule = new TileModule();
  });

  it('should create an instance', () => {
    expect(tileModule).toBeTruthy();
  });
});

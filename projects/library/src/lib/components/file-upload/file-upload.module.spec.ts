import { FileUploadModule } from './file-upload.module';

describe('FileUploadModule', () => {
  let fileUploadModule: FileUploadModule;

  beforeEach(() => {
    fileUploadModule = new FileUploadModule();
  });

  it('should create an instance', () => {
    expect(fileUploadModule).toBeTruthy();
  });
});

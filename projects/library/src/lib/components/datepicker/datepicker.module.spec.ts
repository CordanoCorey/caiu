import { DatepickerModule } from './datepicker.module';

describe('DatepickerModule', () => {
  let datepickerModule: DatepickerModule;

  beforeEach(() => {
    datepickerModule = new DatepickerModule();
  });

  it('should create an instance', () => {
    expect(datepickerModule).toBeTruthy();
  });
});

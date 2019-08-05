import { build, toInt, integerArray } from './utils';

export class DateRange {
  startDate: Date = null;
  endDate: Date = null;
}

export class Month {
  index = 0;
  name = '';
  abbreviation = '';
  initial = '';
}

export class Weekday {
  index = 0;
  name = '';
  abbreviation = '';
  initial = '';
}

export class DateHelper {
  static MonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  static BuildStartTime(startDate: Date, startHours: number, startMinutes: number, startMeridian: 'AM' | 'PM'): Date {
    const startTime = new Date(startDate);
    const hours = startMeridian === 'AM' ? startHours : startHours + 12;
    startTime.setHours(hours);
    startTime.setMinutes(startMinutes);
    return startTime;
  }

  static BuildEndTime(startTime: Date, dHours: number, dMinutes: number): Date {
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + dHours);
    endTime.setMinutes(endTime.getMinutes() + dMinutes);
    return endTime;
  }

  static CalendarDaySpan(startDate: Date, endDate: Date): Date[] {
    const daysBetween = Math.ceil(DateHelper.DaysBetween(startDate, endDate));
    return daysBetween && daysBetween > 0
      ? integerArray(daysBetween).map(i => {
          const d = new Date();
          d.setDate(new Date(startDate).getDate() + i);
          return d;
        })
      : [new Date(startDate)];
  }

  static CalendarDayStringSpan(startDate: Date, endDate: Date): string[] {
    return DateHelper.CalendarDaySpan(startDate, endDate).map(d => DateHelper.ToDayString(d));
  }

  static CountDaysInMonth(date: Date): number {
    return DateHelper.DaysInMonth(date).length;
  }

  static DaysBetween(startDate: Date, endDate: Date): number {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (DateHelper.TreatAsUTC(new Date(endDate)).getTime() - DateHelper.TreatAsUTC(new Date(startDate)).getTime()) / millisecondsPerDay;
  }

  static DaysInMonth(date: Date): Date[] {
    const d = new Date(date.getFullYear(), date.getMonth(), 1);
    const days = [];
    const month = d.getMonth();
    while (d.getMonth() === month) {
      days.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    return days;
  }

  static FormatDate(date: Date): string {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();

    return month && day && year ? [month, day, year].join('/') : null;
  }

  static FormatDateDashes(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  static FormatDateSlashes(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [month, day, year].join('/');
  }

  static FromMonthYear(monthYear: string): Date {
    const year = DateHelper.ToYearNumberFromMonthYear(monthYear);
    const month = DateHelper.ToMonthNumberFromMonthYear(monthYear);
    return year && month ? new Date(year, month) : new Date();
  }

  static GetFirstDayOfLastMonth(date: Date): Date {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth() - 1, 1);
  }

  static GetFirstDayOfMonth(date: Date): Date {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  }

  static GetFirstDayOfNextMonth(date: Date): Date {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth() + 1, 1);
  }

  static GetLastDayOfMonth(date: Date): Date {
    const days = DateHelper.DaysInMonth(date);
    return days[days.length - 1];
  }

  static GetHour(date: Date): number {
    const d = new Date(date);
    return d.getHours();
  }

  static GetMeridian(date: Date): 'AM' | 'PM' {
    const hour = DateHelper.GetHour(date);
    return hour >= 12 ? 'PM' : 'AM';
  }

  static GetMinute(date: Date): number {
    const d = new Date(date);
    return d.getMinutes();
  }

  static GetMonthIndex(date: Date): number {
    const d = new Date(date);
    return d.getMonth();
  }

  static GetMonthName(date: Date): string {
    const d = new Date(date);
    return build(Month, DateHelper.Months.find(x => x.index === d.getMonth())).name;
  }

  static GetShortMonthName(date: Date): string {
    const d = new Date(date);
    return build(Month, DateHelper.Months.find(x => x.index === d.getMonth())).abbreviation;
  }

  static GetWeekdayIndex(date: Date): number {
    const d = new Date(date);
    return d.getDay();
  }

  static GetYear(date: Date): number {
    const d = new Date(date);
    return d.getFullYear();
  }

  static HoursBetween(d1: Date, d2: Date): number {
    return DateHelper.MillisecondsBetween(d1, d2) / 3600000;
  }

  static HoursFromBeginningOfDay(d: Date): number {
    const date = new Date(d);
    return date.getHours() + date.getMinutes() / 60;
  }

  static IsBetween(d: Date, startDate: Date, endDate: Date): boolean {
    const date = new Date(d);
    const calculatedEndDate = endDate || startDate;
    return startDate && date > new Date(startDate) && date < new Date(calculatedEndDate);
  }

  static IsDate(date: any): boolean {
    return Object.prototype.toString.call(date) === '[object Date]';
  }

  static IsValidDate(date: any): boolean {
    const dateWrapper = new Date(date);
    return !isNaN(dateWrapper.getDate());
  }

  static IsWeekday(d: Date): boolean {
    const day = new Date(d).getDay();
    return day === 1 || day === 2 || day === 3 || day === 4 || day === 5;
  }

  static IsWeekend(d: Date): boolean {
    const day = new Date(d).getDay();
    return day === 0 || day === 6;
  }

  static MillisecondsBetween(d1: Date, d2: Date): number {
    return Math.abs(new Date(d1).getTime() - new Date(d2).getTime());
  }

  static NextDay(fromDate: Date): Date {
    const today = new Date(fromDate);
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow;
  }

  static TimeAgo(date: Date): string {
    if (!date) {
      return '';
    }
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + ' years';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + ' months';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + ' days';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + ' hours';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + ' minutes';
    }
    return Math.floor(seconds) + ' seconds';
  }

  static TimeBetween(startDate: Date, endDate: Date): number {
    return new Date(endDate).getTime() - new Date(startDate).getTime();
  }

  static ToDayString(d: Date): string {
    const date = new Date(d);
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  static ToMonthName(d: Date): string {
    const date = new Date(d);
    return DateHelper.MonthNames[date.getMonth()];
  }

  static ToMonthNumber(d: Date): number {
    const date = new Date(d);
    return date.getMonth() + 1;
  }

  static ToMonthNumberFromMonthYear(monthYear: string): number {
    const month = monthYear.substr(monthYear.length - 2);
    return toInt(month) - 1;
  }

  static ToMonthNumberFromMonthYearName(monthYear: string): number {
    const parts = monthYear.split(/\s*,\s*/);
    const month = DateHelper.MonthNumbers[parts[0]];
    return month;
  }

  static ToMonthYear(d: Date): string {
    const date = new Date(d);
    const monthNumber = DateHelper.ToMonthNumber(date);
    const month = monthNumber < 10 ? `0${monthNumber}` : monthNumber;
    return `${date.getFullYear()}-${month}`;
  }

  static ToMonthYearName(d: Date): string {
    const date = new Date(d);
    const month = DateHelper.ToMonthName(date);
    const year = date.getFullYear();
    return month && year ? `${month} ${year}` : '';
  }

  static ToYearNumberFromMonthYear(monthYear: string): number {
    const year = monthYear.substring(0, 4);
    return toInt(year);
  }

  static TreatAsUTC(date: Date) {
    const result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
  }

  static get Today(): Date {
    return new Date();
  }

  static get Month(): number {
    return DateHelper.Today.getMonth();
  }

  static get MonthNumbers(): any {
    return DateHelper.MonthNames.reduce((acc, x, i) => Object.assign({}, acc, { [x]: i }));
  }

  static get Year(): number {
    return DateHelper.Today.getFullYear();
  }

  static get NextSchoolYear(): number {
    return DateHelper.Month < 7 ? DateHelper.Year : DateHelper.Year + 1;
  }

  static get NextSchoolYearStartDate(): Date {
    return new Date(DateHelper.SchoolYearStart(DateHelper.NextSchoolYear));
  }

  static get PreviousSchoolYear(): number {
    return DateHelper.Month < 7 ? DateHelper.Year : DateHelper.Year + 1;
  }

  static get PreviousSchoolYearEndDate(): Date {
    return new Date(DateHelper.SchoolYearEnd(DateHelper.PreviousSchoolYear));
  }

  static get FutureDate(): Date {
    const date = DateHelper.Today;
    return DateHelper.AddDays(date, 100000);
  }

  static get PastDate(): Date {
    const date = DateHelper.Today;
    return DateHelper.SubtractDays(date, 100000);
  }

  static AddDays(d: Date, days: number): Date {
    const date = new Date(d);
    date.setDate(date.getDate() + days);
    return date;
  }

  static SubtractDays(d: Date, days: number): Date {
    const date = new Date(d);
    date.setDate(date.getDate() - days);
    return date;
  }

  static BuildDate(year: number, month: number, day: number): Date {
    const date = new Date();
    date.setFullYear(year);
    date.setMonth(month);
    date.setDate(day);
    return date;
  }

  static DateChanged(d1: Date, d2: Date): boolean {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    return date1.getDate() !== date2.getDate() || date1.getMonth() !== date2.getMonth() || date1.getFullYear() !== date2.getFullYear();
  }

  static IsSameDay(d1: Date, d2: Date): boolean {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  }

  static get YearStartDate(): Date {
    if (DateHelper.Month < 7) {
      return DateHelper.BuildDate(DateHelper.Year - 1, 6, 1);
    } else {
      return DateHelper.BuildDate(DateHelper.Year, 6, 1);
    }
  }

  static get PreviousYearStartDate(): Date {
    if (DateHelper.Month < 7) {
      return DateHelper.BuildDate(DateHelper.Year - 2, 6, 1);
    } else {
      return DateHelper.BuildDate(DateHelper.Year - 1, 6, 1);
    }
  }

  static SchoolYearStart(year: number): Date {
    return DateHelper.BuildDate(year, 6, 1);
  }

  static get YearEndDate(): Date {
    if (DateHelper.Month < 7) {
      return DateHelper.BuildDate(DateHelper.Year, 5, 30);
    } else {
      return DateHelper.BuildDate(DateHelper.Year + 1, 5, 30);
    }
  }

  static get PreviousYearEndDate(): Date {
    if (DateHelper.Month < 7) {
      return DateHelper.BuildDate(DateHelper.Year - 1, 5, 30);
    } else {
      return DateHelper.BuildDate(DateHelper.Year, 5, 30);
    }
  }

  static SchoolYearEnd(year?: number): Date {
    return DateHelper.BuildDate(year - 1, 5, 30);
  }

  static BuildDateRange(dateRangeId: number): DateRange {
    let startDate: Date;
    let endDate: Date;
    switch (dateRangeId) {
      case 0:
        break;
      case 1:
        break;
      case 2: // Today
        startDate = DateHelper.Today;
        endDate = startDate;
        break;
      case 3: // Next 15
        startDate = DateHelper.Today;
        endDate = DateHelper.AddDays(startDate, 15);
        break;
      case 4: // Next 30
        startDate = DateHelper.Today;
        endDate = DateHelper.AddDays(startDate, 30);
        break;
      case 5: // Next 60
        startDate = DateHelper.Today;
        endDate = DateHelper.AddDays(startDate, 60);
        break;
      case 6: // Previous 15
        endDate = DateHelper.Today;
        startDate = DateHelper.SubtractDays(endDate, 15);
        break;
      case 7: // Previous 30
        endDate = DateHelper.Today;
        startDate = DateHelper.SubtractDays(endDate, 30);
        break;
      case 8: // Previous 60
        endDate = DateHelper.Today;
        startDate = DateHelper.SubtractDays(endDate, 60);
        break;
      case 9: // School Year - Runs from July 1st Thru June 30th
        startDate = DateHelper.YearStartDate;
        endDate = DateHelper.YearEndDate;
        break;
      case 10: // Number of meetings = 10
        startDate = DateHelper.Today;
        endDate = DateHelper.FutureDate;
        break;
      case 11: // Previous School Year
        startDate = DateHelper.PreviousYearStartDate;
        endDate = DateHelper.PreviousYearEndDate;
        break;
    }
    return build(DateRange, { startDate, endDate });
  }

  static get Months() {
    return [
      build(Month, { name: 'January', abbreviation: 'Jan', index: 0 }),
      build(Month, { name: 'February', abbreviation: 'Feb', index: 1 }),
      build(Month, { name: 'March', abbreviation: 'Mar', index: 2 }),
      build(Month, { name: 'April', abbreviation: 'Apr', index: 3 }),
      build(Month, { name: 'May', abbreviation: 'May', index: 4 }),
      build(Month, { name: 'June', abbreviation: 'June', index: 5 }),
      build(Month, { name: 'July', abbreviation: 'July', index: 6 }),
      build(Month, { name: 'August', abbreviation: 'Aug', index: 7 }),
      build(Month, { name: 'September', abbreviation: 'Sept', index: 8 }),
      build(Month, { name: 'October', abbreviation: 'Oct', index: 9 }),
      build(Month, { name: 'November', abbreviation: 'Nov', index: 10 }),
      build(Month, { name: 'December', abbreviation: 'Dec', index: 11 })
    ];
  }

  static get Weekdays() {
    return [
      build(Weekday, {
        name: 'Sunday',
        abbreviation: 'Sun',
        initial: 'Su',
        index: 0
      }),
      build(Weekday, {
        name: 'Monday',
        abbreviation: 'Mon',
        initial: 'M',
        index: 1
      }),
      build(Weekday, {
        name: 'Tuesday',
        abbreviation: 'Tues',
        initial: 'T',
        index: 2
      }),
      build(Weekday, {
        name: 'Wednesday',
        abbreviation: 'Wed',
        initial: 'W',
        index: 3
      }),
      build(Weekday, {
        name: 'Thursday',
        abbreviation: 'Thurs',
        initial: 'Th',
        index: 4
      }),
      build(Weekday, {
        name: 'Friday',
        abbreviation: 'Fri',
        initial: 'F',
        index: 5
      }),
      build(Weekday, {
        name: 'Saturday',
        abbreviation: 'Sat',
        initial: 'S',
        index: 6
      })
    ];
  }
}

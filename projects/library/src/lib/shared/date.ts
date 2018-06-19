import { build, toInt } from './utils';

export class DateRange {
    startDate: Date = new Date();
    endDate: Date = new Date();
}

export class DateHelper {

    static MonthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

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

    static FromMonthYear(monthYear: string): Date {
        const year = DateHelper.ToYearNumberFromMonthYear(monthYear);
        const month = DateHelper.ToMonthNumberFromMonthYear(monthYear);
        return year && month ? new Date(year, month) : new Date();
    }

    static IsDate(date: any): boolean {
        return Object.prototype.toString.call(date) === '[object Date]';
    }

    static IsValidDate(date: any): boolean {
        const dateWrapper = new Date(date);
        return !isNaN(dateWrapper.getDate());
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
        return !DateHelper.DateChanged(d1, d2);
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
}

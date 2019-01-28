import { Validators } from '@angular/forms';
export class Event {
    eventId = '';
    eventName = '';
    calendarId = 0;
    monthOf = 0;
    dayOf = 0;
    yearOf = 0;
    startTime: Time = new Time();
    endTime: Time = new Time();

    get startHour(): number {
        return this.startTime.hour;
    }

    get startMinute(): number {
        return this.startTime.minute;
    }

    get startTimePeriod(): string {
        return this.startTime.timePeriod;
    }

    get endHour(): number {
        return this.endTime.hour;
    }

    get endMinute(): number {
        return this.endTime.minute;
    }

    get endTimePeriod(): string {
        return this.endTime.timePeriod;
    }

    get metadata(): any {
        return {
            eventName: {
                validators: [Validators.required]
            },
            ignore: [
                'dayOf',
                'startHour',
                'startMinute',
                'startTimePeriod',
                'monthOf',
                'endHour',
                'endMinute',
                'endTimePeriod',
                'yearOf',
            ]
        };
    }
}

export class Time {
    hour = 0;
    minute = 0;
    timePeriod: 'AM' | 'PM' = 'AM';

    get metadata(): any {
        return {
            hour: {
                validators: [Validators.required]
            },
            minute: {
                validators: [Validators.required]
            },
            timePeriod: {
                validators: [Validators.required]
            }
        };
    }
}

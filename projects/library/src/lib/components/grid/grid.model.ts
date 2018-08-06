import { GridComponent } from './grid.component';
import { Collection } from '../../shared/collection';
import { DateHelper } from '../../shared/date';
import { CompositeFilterDescriptor, GroupableSettings, SortDescriptor, SortSettings } from '../../shared/kendo';
import { QueryModel, StyleModel, orderBy } from '../../shared/models';

export class Grid<T> {
    query: QueryModel<T> = new QueryModel<T>();
    style: StyleModel = new StyleModel();

    detailRowHeight: number;
    filter: CompositeFilterDescriptor;
    filterable = true;
    groupable: GroupableSettings | boolean;
    height: number;
    pageSize: number;
    pageable: any | boolean;
    rowHeight: number;
    scrollable: any;
    selectable: boolean;
    skip: number;
    sortable: SortSettings = { mode: 'multiple' };
    group: any[];
    rowClass: Function;
    sort: any[];

    static ApplyFilter(acc: any[], operator: string, field: string, value: any): any[] {
        switch (operator) {
            case 'contains':
                return acc.filter(row => Grid.Contains(row[field], value));
            case 'gte':
                return acc.filter(row => Grid.MatchDate(row[field], value));
        }
    }

    static Build<T>(items: T[]): Grid<T> {
        const data = Object.assign(new Collection<T>(), { items });
        return new Grid<T>(data);
    }

    static BuildSort(field: string, dir: 'asc' | 'desc' = 'asc'): SortDescriptor {
        return <SortDescriptor>{ dir, field };
    }

    static Contains(str: string, substr: string): boolean {
        if (typeof (str) === 'string' && typeof (substr) === 'string') {
            return str.toLowerCase().includes(substr.toLowerCase());
        }
        return true;
    }

    static FilterRows(rows: any[], filters: any[]): any[] {
        return filters.reduce((acc, filter) => {
            const operator = filter['operator'];
            const field = filter['field'];
            const value = filter['value'];
            return Grid.ApplyFilter(rows, operator, field, value);
        }, rows);
    }

    static MatchDate(date1: Date, date2: Date): boolean {
        return DateHelper.IsSameDay(date1, date2);
    }

    static PageRows(rows: any[], skip: number, take: number): any[] {
        return rows.filter((row, index) => index >= skip && index < skip + take);
    }

    static SortRows(rows: any[], sort: SortDescriptor[]): any[] {
        return orderBy(rows, sort);
    }

    constructor(public data: Collection<T>) {
    }

    update(grid: GridComponent) {
    }

}

/**
 * Sets the sort settings of the column.
 */
export declare type ColumnSortSettings = boolean | {
    /**
     * Enables the removal of the column sorting.
     */
    allowUnsort?: boolean;
};
/**
 * Sets the sort settings of the Grid.
 */
export declare type SortSettings = boolean | ColumnSortSettings & {
    /**
     * The sort mode of the Grid. The available modes for sorting are:
     * - `single`
     * - `multiple`
     */
    mode?: 'single' | 'multiple';
};

/**
 * A basic filter expression. Usually part of
 * [`CompositeFilterDescriptor`]({% slug api_kendo-data-query_compositefilterdescriptor_kendouiforangular %}).
 *
 * For more information, refer to the [`filterBy`]({% slug api_kendo-data-query_filterby_kendouiforangular %}) method.
 */
export interface FilterDescriptor {
    /**
     * The data item field to which the filter operator is applied.
     */
    field?: string | Function;
    /**
     * The filter operator (comparison).
     *
     * The supported operators are:
     *
     * * `"eq"` (equal to)
     * * `"neq"` (not equal to)
     * * `"isnull"` (is equal to null)
     * * `"isnotnull"` (is not equal to null)
     * * `"lt"` (less than)
     * * `"lte"` (less than or equal to)
     * * `"gt"` (greater than)
     * * `"gte"` (greater than or equal to)
     *
     * The following operators are supported for string fields only:
     *
     * * `"startswith"`
     * * `"endswith"`
     * * `"contains"`
     * * `"doesnotcontain"`
     * * `"isempty"`
     * * `"isnotempty"`
     */
    operator: string | Function;
    /**
     * The value to which the field is compared. Has to be of the same type as the field.
     */
    value?: any;
    /**
     * Determines if the string comparison is case-insensitive.
     */
    ignoreCase?: boolean;
}
/**
 * A complex filter expression.
 *
 * For more information, refer to the [`filterBy`]({% slug api_kendo-data-query_filterby_kendouiforangular %}) method.
 */
export interface CompositeFilterDescriptor {
    /**
     * The logical operation to use when the `filter.filters` option is set.
     *
     * The supported values are:
     * * `"and"`
     * * `"or"`
     */
    logic: 'or' | 'and';
    /**
     * The nested filter expressions&mdash;either
     * [`FilterDescriptor`]({% slug api_kendo-data-query_filterdescriptor_kendouiforangular %}), or
     * [`CompositeFilterDescriptor`]({% slug api_kendo-data-query_compositefilterdescriptor_kendouiforangular %}).
     * Supports the same options as `filter`. Filters can be nested indefinitely.
     */
    filters: Array<FilterDescriptor | CompositeFilterDescriptor>;
}

/**
 * The grouping settings of the Grid component.
 */
export interface GroupableSettings {
    /**
     * Determines if grouping by dragging and dropping the column headers is allowed.
     */
    enabled: boolean;
    /**
     * The text that is displayed when the grouping area is empty.
     * The default value is **Drag a column header and drop it here to group by that column.**
     * If set to `true`, the user can group the Grid by dragging the column header cells.
     * By default, grouping is disabled.
     */
    emptyText?: string;
    /**
     * Determines if the group footer template is visible when the group is collapsed. The default value is `false`.
     */
    showFooter: boolean;
}

/**
 * The sort descriptor used by the `orderBy` method.
 *
 * It has the following properties:
 */
export interface SortDescriptor {
    /**
     * The field that is sorted.
     */
    field: string;
    /**
     * The sort direction.
     *
     * The available values are:
     * - `asc`
     * - `desc`
     */
    dir?: 'asc' | 'desc';
}

/**
 * The result of the [`process`]({% slug api_kendo-data-query_process%}) method applied to a data structure.
 */
export interface DataResult {
    /**
     * The data that will be rendered by the Grid as an array.
     */
    data: any[];
    /**
     * The total number of records that are available.
     */
    total: number;
}

/**
 * The data type that is expected by the Grid.
 */
export interface GridDataResult extends DataResult {
}

/**
 * The returned type of the data state `change` event.
 */
export interface DataStateChangeEvent {
    /**
     * The number of records to skip.
     */
    skip: number;
    /**
     * The number of records to take.
     */
    take: number;
    /**
     * The sort descriptors by which the data is sorted.
     */
    sort?: Array<SortDescriptor>;
    /**
     * The group descriptors by which the data is grouped.
     */
    group?: Array<GroupDescriptor>;
    /**
     * The filter descriptor by which the data is filtered.
     */
    filter?: CompositeFilterDescriptor;
}

/**
 * The group descriptor used by the `groupBy` method.
 *
 * It has the following properties:
 */
export interface GroupDescriptor {
    /**
     * The data item field to group by.
     */
    field: string;
    /**
     * The sort order of the group.
     */
    dir?: 'asc' | 'desc';
    /**
     * The aggregates which are calculated during grouping.
     */
    aggregates?: Array<AggregateDescriptor>;
}

/**
 * The aggregate operation.
 *
 * For more information, refer to the [`aggregateBy`]({% slug api_kendo-data-query_aggregateby %}) method.
 */
export interface AggregateDescriptor {
    /**
     * The name of the record field on which the function will be executed.
     */
    field: string;
    /**
     * The aggregate function that will be calculated.
     */
    aggregate: 'count' | 'sum' | 'average' | 'min' | 'max';
}

/**
 * The returned type of the page `change` event.
 */
export interface PageChangeEvent {
    /**
     * The number of records to skip.
     */
    skip: number;
    /**
     * The number of records to take.
     */
    take: number;
}

export type orderBy<T> = (data: T[], descriptors: SortDescriptor[]) => T[];

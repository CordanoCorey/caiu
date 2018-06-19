import { build } from './utils';

export class Lookup {
    expires: Date;
    typeName = '';
    values: LookupValue[] = [];
    _key = '';

    get key(): string {
        return this._key || this.typeName;
    }

    set key(value: string) {
        this._key = value;
    }

    get name(): string {
        return this.key;
    }

    set name(value: string) {
        this.key = value;
    }

    get names(): string[] {
        return this.values.map(x => x.name);
    }
}

export class LookupValue {
    id = 0;
    active = true;
    description = '';
    name = '';
    sort = 0;
    tooltip = ''; // use this for accessibility and/or help tooltip messages
    _label = '';
    _value: any;

    get value(): any {
        return this._value || this.id;
    }

    set value(value: any) {
        this._value = value;
    }

    get label(): string {
        return this._label || this.description;
    }

    set label(value: string) {
        this._label = value;
    }

}

export class LookupModel {
    [key: string]: Lookup;
}

export class AddLookupPayload {
    key = '';
    value: '';
}

export function buildLookupValues(values: LookupValue[], names: string[]): LookupValue[] {
    return names.reduce((acc, name) => {
        const value = values.find(x => x.name === name);
        return value ? [...acc, value] : [...acc];
    }, []);
}

export function findLookupIdByName(values: LookupValue[], name: string): number {
    const lkp = build(LookupValue, values.find(x => x.name === name));
    return lkp.id;
}

export function findLookupNameById(values: LookupValue[], id: number): string {
    const lkp = build(LookupValue, values.find(x => x.id === id));
    return lkp.name;
}

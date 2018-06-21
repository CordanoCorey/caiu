import { build } from '../shared/utils';

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

export class Lookups {
    [key: string]: Lookup;

    static AddLookups(state: Lookups, lookups: Lookup[]): Lookups {
        return lookups.reduce((acc: Lookups, lookup: Lookup): Lookups =>
            build(Lookups, acc, { [lookup.key]: build(Lookup, lookup) }), state);
    }

    static AddLookup(state: Lookups, lookup: Lookup): Lookups {
        return build(Lookups, state, {
            [lookup.key]: build(Lookup, lookup)
        });
    }

    static BuildLookupValues(values: LookupValue[], names: string[]): LookupValue[] {
        return names.reduce((acc, name) => {
            const value = values.find(x => x.name === name);
            return value ? [...acc, value] : [...acc];
        }, []);
    }

    static FindLookupIdByName(values: LookupValue[], name: string): number {
        const lkp = build(LookupValue, values.find(x => x.name === name));
        return lkp.id;
    }

    static FindLookupNameById(values: LookupValue[], id: number): string {
        const lkp = build(LookupValue, values.find(x => x.id === id));
        return lkp.name;
    }

    static RemoveLookup(state: Lookups, removeKey: string): Lookups {
        const newState = new Lookups();
        const keys = Object.keys(state).filter(key => key !== removeKey);
        keys.forEach(key => {
            newState[key] = Object.assign({}, state[key]);
        });
        return newState;
    }

}

export class AddLookupPayload {
    key = '';
    value: '';
}

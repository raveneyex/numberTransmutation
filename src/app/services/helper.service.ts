import { Injectable } from '@angular/core';
import TransmutatedPair from '../types/TransmutatedPair';

let limit;

@Injectable()
export class HelperService {
    private hardcoded: TransmutatedPair[];

    constructor() {
        this._initHardcodedData();
        this._initStoredLimit();
    }

    get limit(): number {
        return limit;
    }

    set limit(value: number) {
        if (value > Number.MAX_SAFE_INTEGER) {
            throw new Error('Cannot save ')
        }
        if (!value) {
            limit = null;
        } else {
            limit = Math.abs(value);
        }
        this.persistConfig(limit);
    }

    get VALUES_STORAGE_KEY() {
        return 'TransmutationValues666';
    }

    get CONFIG_STORAGE_KEY() {
        return 'TransmutationConfig666';
    }

    public parseInput(input: string): number {
        const num = parseInt(input, 10);
        if (Number.isNaN(num)) {
            throw new Error('Input must be a number');
        }
        if (!Number.isSafeInteger(num)) {
            throw new Error('The entered number cannot be safely stored.');
        }

        if (this.limit !== null && this.limit !== undefined) {
            if (num > this.limit) {
                throw new Error('The number exceeds the user-defined limit');
            }
        }
        return num;
    }

    public getStoredValues(): TransmutatedPair[] {
        try {
            let storedValues = this._readFromStorage(this.VALUES_STORAGE_KEY);
            if (!storedValues.length) {
                storedValues = [...this.hardcoded];
            }
            return [...storedValues];
        } catch (e) {
            return [...this.hardcoded];
        }
    }

    public getStoredConfig(): number {
        try {
            return parseInt(this._readFromStorage(this.CONFIG_STORAGE_KEY), 10);
        } catch (e) {
            return null;
        }
    }

    public persistValues(values:TransmutatedPair[]): void {
        this._saveToStorage(values, this.VALUES_STORAGE_KEY);
    }

    public persistConfig(value:number): void {
        this._saveToStorage(value, this.CONFIG_STORAGE_KEY);
    }

    private _saveToStorage(values: any, key: string) {
        try {
            localStorage.setItem(key, JSON.stringify(values));
        } catch (e) {
            console.error('Cannot save to localStorage', e);
        }
    }

    private _readFromStorage(key: string): any  {
        return JSON.parse(localStorage.getItem(key));
    }

    private _initHardcodedData() {
        this.hardcoded = [
            {num: 5, words: 'five'},
            {num: 127, words: 'one hundred and twenty-seven'},
            {num: -123, words: 'Negative one hundred and tweny-three'}
        ];
    }

    private _initStoredLimit() {
        const storedLimit = this.getStoredConfig();
        if (storedLimit) {
            this.limit = storedLimit;
        }
    }
}

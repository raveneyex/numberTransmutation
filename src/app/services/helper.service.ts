import { Injectable } from '@angular/core';
import TransmutatedPair from '../types/TransmutatedPair';

let limit;      // limit is hidden into the Module.

@Injectable()   // Service should be resolved by angular's Dependency Injection thing.
export class HelperService {
    private hardcoded: TransmutatedPair[];  // initial data

    /**
     * Utilitary service for handling limit config and storage operations
     * @constructor
     */
    constructor() {
        //  On instantiation check to see if there's a stored limit
        this._initStoredLimit();
    }

    // Getter accesors for hidden limit var
    get limit(): number {
        return limit;
    }

    // Setter for hidden limit var
    set limit(value: number) {
        if (!value) {   // Allows falsy values to clear the limit
            limit = null;
        } else {
            limit = Math.abs(value);    // User limit is always positive
        }
        this.persistConfig(limit);      // Save to storage
    }

    // Constant for storing TransmutatedPair values
    get VALUES_STORAGE_KEY() {
        return 'TransmutationValues666';
    }

    // Constant for storing limit config
    get CONFIG_STORAGE_KEY() {
        return 'TransmutationConfig666';
    }

    /**
     * @public
     * Parses a user input into a number.
     * @param {string} input - The user input to parse
     * @return {number} The parsed user input
     * @throws {Error} If input is NaN or an Unsafe Integer.
     */
    public parseInput(input: string): number {
        const num = parseInt(input, 10);
        if (Number.isNaN(num)) {
            throw new Error('Input must be a number');
        }
        if (!Number.isSafeInteger(num)) {
            throw new Error('Entered number cannot exceed the System Limit');
        }

        return num;
    }

    /**
     * @public
     * Reads values from Storage.
     * @returns {TransmutatedPair[]} The values saved in storage.
     */
    public getStoredValues(): TransmutatedPair[] {
        try {
            const storedValues = this._readFromStorage(this.VALUES_STORAGE_KEY);
            return storedValues;
        } catch (e) {
            return [];
        }
    }

    /**
     * @public
     * Reads config from Storage.
     * @returns {number} the stored config limit
     */
    public getStoredConfig(): number {
        try {
            return parseInt(this._readFromStorage(this.CONFIG_STORAGE_KEY), 10);
        } catch (e) {
            return null;
        }
    }

    /**
     * @public
     * Persists values into Storage
     * @param {TransmutatedPair[]} values The values to save.
     */
    public persistValues(values: TransmutatedPair[]): void {
        this._saveToStorage(values, this.VALUES_STORAGE_KEY);
    }

    /**
     * @public
     * Persists the limit into Storage
     * @param {number} value The limit to save
     */
    public persistConfig(value: number): void {
        this._saveToStorage(value, this.CONFIG_STORAGE_KEY);
    }

    /**
     * @public
     * Clears the Storage
     */
    public clearStorage() {
        try {
            localStorage.clear();
        } catch (e) {
            // Intentionally bleeding this to the console and not to the UI
            console.error(e);
        }
    }

    /**
     * Saves data into storage using the given key
     * @private
     * @param {any} values data to save
     * @param {string} key key to store the data under
     */
    private _saveToStorage(values: any, key: string) {
        try {
            localStorage.setItem(key, JSON.stringify(values));
        } catch (e) {
            console.error('Cannot save to localStorage', e);
        }
    }

    /**
     * @private
     * Reads data from the given key in Storage.
     * Data is parsed using JSON.parse
     */
    private _readFromStorage(key: string): any  {
        return JSON.parse(localStorage.getItem(key));
    }

    /**
     * @private
     * Reads config from Storage and, if found, applies it
     */
    private _initStoredLimit() {
        const storedLimit = this.getStoredConfig();
        if (storedLimit) {
            this.limit = storedLimit;
        }
    }
}

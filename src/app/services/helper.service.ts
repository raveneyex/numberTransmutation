import { Injectable } from '@angular/core';
import TransmutatedPair from '../types/TransmutatedPair';

@Injectable()
export class HelperService {

    get STORAGE_KEY() {
        return 'TransmutationStorage666';
    }

    public parseInput(input: string): number {
        const num = parseInt(input, 10);
        if (Number.isNaN(num)) {
            throw new Error('Input must be a number');
        }
        if (!Number.isSafeInteger(num)) {
            throw new Error('The entered number cannot be safely stored.');
        }
        return num;
    }

    saveToStorage(values: TransmutatedPair[]) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(values));
        } catch(e) {
            console.error('Cannot save to localStorage', e);
        }
    }

    readFromStorage(): TransmutatedPair[] {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY));
        } catch (e) {
            console.error('Cannot read from localStorage', e);
            return [];
        }
    }
}

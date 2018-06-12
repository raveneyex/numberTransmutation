import { Injectable } from '@angular/core';
import TransmutatedPair from '../types/TransmutatedPair';

let limit;

@Injectable()
export class TransmutationService {
    get limit(): number {
        return (limit !== null && limit !== undefined)
            ? limit
            : Number.MAX_SAFE_INTEGER;
    }

    set limit(value: number) {
        if (!value) {
            limit = null;
        } else {
            limit = Math.abs(value);
        }
    }

    public transmutate(input: number): TransmutatedPair {
        return { num: input, words: input.toString() };
    }
}

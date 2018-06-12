import { Injectable } from '@angular/core';
import TransmutatedPair from '../types/TransmutatedPair';

const TOKENS = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen',
    20: 'twenty',
    30: 'thirty',
    40: 'forty',
    50: 'fifty',
    60: 'sixty',
    70: 'seventy',
    80: 'eighty',
    90: 'ninety',
    100: 'hundred and',
    1000: 'thousand',
    1000000: 'million',
    1000000000: 'billion',
    1000000000000: 'trillion',
    1000000000000000: 'quatrillion',
    1000000000000000000: 'quintillion',
    /**
     * From this point onwards integers are NOT safely stored in JS.
     * Here to showcase how the algorithm can be expanded beyond the system limit.
     */
    1000000000000000000000: 'sixtillion',
    MINUS: 'Negative'
};

const MAGNITUDES = [100, 1000, 1000000, 1000000000, 1000000000000, 1000000000000000, 1000000000000000000];

@Injectable()
export class TransmutationService {

    public transmutate(input: number): TransmutatedPair {
        const words = this._toWords(input);
        return { num: input, words };
    }

    private _toWords(number: number, words = []) {
        if (number < 100) {
            const value = this._lessThan100(number);
            words.push(value);
        } else if (number === 100) {
            words.push('one hundred');
        } else if (number > 100) {
            const values = this._moreThan100(number);
            words = [...words, ...values];
        }
        return words.join(' ');
    }

    private _lessThan100(number: number, words = []): string {
        if (number < 0) {
            words.push(TOKENS.MINUS);
            number = Math.abs(number);
        }

        if (number <= 20) {
            words.push(TOKENS[number]);
        } else if (number < 100) {
            const remainder = number % 10;
            words.push(TOKENS[number - remainder]);
            if (remainder) {
                words.push(`-${TOKENS[remainder]}`);
            }
        }

        return words.join('');
    }

    private _moreThan100(number: number, words = []): string[] {
        for (let i = 1; i <= MAGNITUDES.length; i += 1) {
            // Note: intentionally skipping first magnitude.
            const MAGNITUDE = MAGNITUDES[i];
            const DIVIDER = MAGNITUDES[i - 1];

            if (number < MAGNITUDE) {
                const remainder = number % DIVIDER;
                const word = `${this._toWords(Math.floor(number / DIVIDER))} ${TOKENS[DIVIDER]}`;
                words.push(word);

                if (remainder) {
                    const remainderWords = this._toWords(remainder);
                    words.push(remainderWords);
                }

                break;
            }
        }
        return words;
    }
}

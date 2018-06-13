import { Injectable } from '@angular/core';
import TransmutatedPair from '../types/TransmutatedPair';

/**
 * @private
 * Map of Tokends needed for the algorithm.
 */
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
/**
 * @private
 * The number magnitudes starting from hundreds. In order 
 */
const MAGNITUDES = [100, 1000, 1000000, 1000000000, 1000000000000, 1000000000000000, 1000000000000000000];

@Injectable()
/**
 * Service in charge of transmutating a number into its words representation.
 */
export class TransmutationService {

    /**
     * @public
     * Transmutates a number into words, and returns the TransmutatedPair
     * @param {number} input the number to transmutate into words
     * @return {TransmutatedPair} an object of the form {num, words} where `num` is the original `input` parameter and `words` is the transmutated value
     */
    public transmutate(input: number): TransmutatedPair {
        const words = this._toWords(input);
        return { num: input, words };
    }

    /**
     * @private
     * Transmutates a number into its representing words.
     * @param {number} number - The number to transmutate
     * @returns {string} the words representing the given input number
     * @example _toWords(999) -> 'nine hundred and ninety-nine'
     */
    private _toWords(number: number) {
        // Where to store the phrase as we build it
        let words = [];
        // Dont allow unsafe numbers
        if (number > Number.MAX_SAFE_INTEGER) {
            throw new Error('Entered number cannot exceed the System Limit');
        }

        // If the number is negative
        if (number < 0) {
            words.push(TOKENS.MINUS);   // Start the phrase with the word 'negative'
            number = Math.abs(number);  // Transform the number into positive.
        }

        // There are 3 considered scenarios:
        if (number < 100) {                             // 1 - The number is less than 100: Easily constructed based on the tokens.
            const value = this._lessThan100(number);
            words.push(value);
        } else if (number === 100) {                    // 2 - The number is equal to 100: Constant case
            words.push('one hundred');
        } else if (number > 100) {                      // 3 - The number is bigger than 100
            /**
             * The idea here is to  deconstruct the number into smaller magnitudes that can be handled
             * by the two trivial cases above.
             * This is the reason why numbers bigger than 100 yield several values, whereas the previous cases yield a single value each.
             */
            const values = this._moreThan100(number);
            words = [...words, ...values];
        }
        // Join all the words using a space.
        return words.join(' ');
    }

    /**
     * @private
     * Transmutates a given input into its representing words
     * @param {number} number the number to represent in words
     * @return {string} the words representing the given number.
     * @example _lessThan100(45) -> 'forty-five
     */
    private _lessThan100(number: number): string {
        const words = [];

        if (number <= 20) { // We have consecutive tokens until 20.
            words.push(TOKENS[number]);
        } else if (number < 100) {
            // Get the units and the tens.
            const units = number % 10;
            const tenths = number - units;
            // Map the tens to the tokens
            words.push(TOKENS[tenths]);
            // If there are units map that too to the tokens
            if (units) {
                // Note the hyphen (-) used to join the tenths to the units
                words.push(`-${TOKENS[units]}`);
            }
        }

        return words.join('');
    }

    /**
     * Transmutates a number bigger than 100 into its representing words.
     * @param {number} number the number (bigger than 100) to transmutate into words
     * @returns {string[]} array with the different tokens that make up the number words
     * @example _moreThan100(101) -> ['one hundred and', 'one']
     */
    private _moreThan100(number: number): string[] {
        /**
         * To decompose a number into a smaller magnitude, one needs to:
         * 1 - Find the immediately superior magnitude in respect to the given number. Let's call this MAGNITUDE
         * 2 - Get the magnitude immediately below MAGNITUDE found in 1. Let's call this DIVIDER
         * 3 - Divide the number by DIVIDER. The resulting integer (rounded-down) will be a number of a smaller magnitude.
         * 4 - Map the current DIVIDER to the TOKENS. This is the name of the current magnitude of the number.
         * 5 - Recursively find the words for 3.
         * 6 - Take note of the residue of the division in 3. Let's call this REMAINDER
         * 7 - If REMAINDER is different than 0, recursively find the words for it
         *
         * Note that the algorithm can be expanded by simply adding the next magnitudes to the MAGNITUDES array and the TOKENS words.
         */
        const words = [];
        for (let i = 1; i <= MAGNITUDES.length; i += 1) {   // Iterate to find 1
            // intentionally skipping first magnitude.
            const MAGNITUDE = MAGNITUDES[i];            // 1
            const DIVIDER = MAGNITUDES[i - 1];          // 2

            if (number < MAGNITUDE) {                   // Verify 1
                const word = `${this._toWords(Math.floor(number / DIVIDER))} ${TOKENS[DIVIDER]}`; // 3, 4 & 5
                const remainder = number % DIVIDER;     // 6
                words.push(word);

                if (remainder) {                        // 7
                    const remainderWords = this._toWords(remainder);
                    words.push(remainderWords);
                }

                break;
            }
        }
        return words;
    }
}

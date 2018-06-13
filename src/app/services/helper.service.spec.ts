import { HelperService } from './helper.service';
import TransmutatedPair from '../types/TransmutatedPair';

describe('HelperService', () => {
    const localStorage: Storage = window.localStorage;
    let serviceInstance: HelperService;

    beforeEach(() => {
        serviceInstance = new HelperService();
        // Setup: spies
        spyOn(localStorage, 'setItem').and.callThrough();
        spyOn(localStorage, 'getItem').and.callThrough();
        spyOn(localStorage, 'clear').and.callThrough();
    });

    describe('parseInput', () => {
        beforeEach(() => {
            serviceInstance.limit = null;
        });

        it('should throw an Error if input is not a number', () => {
            // Setup + Act
            const wrapper = () => {
                serviceInstance.parseInput('Invalid input');
            };
            // Assert
            expect(wrapper).toThrow();
            expect(wrapper).toThrowError('Input must be a number');
        });

        it('should throw an Error if the input is not a safe int', () => {
            // Setup
            const HUGE_INPUT = '9007199254740992'; // Warning: unstable
            // Act
            const wrapper = () => {
                serviceInstance.parseInput(HUGE_INPUT);
            };
            // Assert
            expect(wrapper).toThrow();
            expect(wrapper).toThrowError('Entered number cannot exceed the System Limit');
        });

        it('should parse negative inputs', () => {
            // Setup
            let input = '-5';
            let expected = -5;
            // Act
            let actualValue = serviceInstance.parseInput(input);
            // Assert
            expect(actualValue).toEqual(expected);
            // REDO
            input = '-999';
            expected = -999;
            actualValue = serviceInstance.parseInput(input);
            expect(actualValue).toEqual(expected);
        });

        it('should parse the input into a number', () => {
            // Setup
            let input = '9999';
            let expected = 9999;
            // Act
            let actualValue = serviceInstance.parseInput(input);
            // Assert
            expect(actualValue).toEqual(expected);
            // REDO
            input = '-666';
            expected = -666;
            actualValue = serviceInstance.parseInput(input);
            expect(actualValue).toEqual(expected);
        });
    });

    describe('persistValues', () => {
        it('Should save values using the appropriate storage key', () => {
            // Setup
            const testData: TransmutatedPair[] = [{
                num: 1,
                words: 'one'
            }];
            const VALUES_KEY = serviceInstance.VALUES_STORAGE_KEY;
            // Act
            serviceInstance.persistValues(testData);
            // Assert
            expect(localStorage.setItem).toHaveBeenCalledWith(VALUES_KEY, JSON.stringify(testData));
        });
    });

    describe('persistConfig', () => {
        it('Should save values using the appropriate storage key', () => {
            // Setup
            const testData = 666;
            const CONFIG_KEY = serviceInstance.CONFIG_STORAGE_KEY;
            // Act
            serviceInstance.persistConfig(testData);
            // Assert
            expect(localStorage.setItem).toHaveBeenCalledWith(CONFIG_KEY, JSON.stringify(testData));
        });
    });

    describe('getStoredValues', () => {
        let testData: TransmutatedPair[];

        beforeEach(() => {
            // General Setup: needs something to read.
            testData = [{
                num: 1,
                words: 'one'
            }];
            serviceInstance.persistValues(testData);
        });

        it('should read values from localStorage', () => {
            // Setup
            const VALUES_KEY = serviceInstance.VALUES_STORAGE_KEY;
            // Act
            const persistedData = serviceInstance.getStoredValues();
            // Assert
            expect(localStorage.getItem).toHaveBeenCalledWith(VALUES_KEY);
            expect(persistedData).toBeDefined();
            expect(persistedData.length).toEqual(testData.length);
            expect(persistedData[0].num).toEqual(testData[0].num);
            expect(persistedData[0].words).toEqual(testData[0].words);
        });
    });

    describe('getStoredConfig', () => {
        beforeEach(() => {
            // General Setup: needs something to read
            serviceInstance.persistConfig(666);
        });

        it('should read a value from localStorage', () => {
            // Setup
            const CONFIG_KEY = serviceInstance.CONFIG_STORAGE_KEY;
            // Act
            const persistedData = serviceInstance.getStoredConfig();
            // Assert
            expect(localStorage.getItem).toHaveBeenCalledWith(CONFIG_KEY);
            expect(persistedData).toBeDefined();
            expect(persistedData).toEqual(666);
        });
    });

    describe('clearStorage', () => {
        it('should call clear on localStorage', () => {
            // Act
            serviceInstance.clearStorage();
            // Assert
            expect(localStorage.clear).toHaveBeenCalled();
        });
    });
});

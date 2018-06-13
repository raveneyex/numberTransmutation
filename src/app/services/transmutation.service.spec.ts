import { TransmutationService } from './transmutation.service';

describe('TransmutationService', () => {
    let serviceInstance: TransmutationService;

    beforeEach(() => {
        serviceInstance = new TransmutationService();
    });

    describe('transmutate', () => {
        it('should transmutate numbers into words: BASIC TOKENS', () => {
            expect(serviceInstance.transmutate(0).words).toEqual('zero');
            expect(serviceInstance.transmutate(1).words).toEqual('one');
            expect(serviceInstance.transmutate(2).words).toEqual('two');
            expect(serviceInstance.transmutate(3).words).toEqual('three');
            expect(serviceInstance.transmutate(4).words).toEqual('four');
            expect(serviceInstance.transmutate(5).words).toEqual('five');
            expect(serviceInstance.transmutate(6).words).toEqual('six');
            expect(serviceInstance.transmutate(7).words).toEqual('seven');
            expect(serviceInstance.transmutate(8).words).toEqual('eight');
            expect(serviceInstance.transmutate(9).words).toEqual('nine');
            expect(serviceInstance.transmutate(10).words).toEqual('ten');
            expect(serviceInstance.transmutate(11).words).toEqual('eleven');
            expect(serviceInstance.transmutate(12).words).toEqual('twelve');
            expect(serviceInstance.transmutate(13).words).toEqual('thirteen');
            expect(serviceInstance.transmutate(14).words).toEqual('fourteen');
            expect(serviceInstance.transmutate(15).words).toEqual('fifteen');
            expect(serviceInstance.transmutate(16).words).toEqual('sixteen');
            expect(serviceInstance.transmutate(17).words).toEqual('seventeen');
            expect(serviceInstance.transmutate(18).words).toEqual('eighteen');
            expect(serviceInstance.transmutate(19).words).toEqual('nineteen');
            expect(serviceInstance.transmutate(20).words).toEqual('twenty');
            expect(serviceInstance.transmutate(30).words).toEqual('thirty');
            expect(serviceInstance.transmutate(40).words).toEqual('forty');
            expect(serviceInstance.transmutate(50).words).toEqual('fifty');
            expect(serviceInstance.transmutate(60).words).toEqual('sixty');
            expect(serviceInstance.transmutate(70).words).toEqual('seventy');
            expect(serviceInstance.transmutate(80).words).toEqual('eighty');
            expect(serviceInstance.transmutate(90).words).toEqual('ninety');
            expect(serviceInstance.transmutate(100).words).toEqual('one hundred');
        });

        it('should transmutate numbers into words: LESS THAN 100', () => {
            expect(serviceInstance.transmutate(91).words).toEqual('ninety-one');
            expect(serviceInstance.transmutate(82).words).toEqual('eighty-two');
            expect(serviceInstance.transmutate(73).words).toEqual('seventy-three');
            expect(serviceInstance.transmutate(64).words).toEqual('sixty-four');
            expect(serviceInstance.transmutate(55).words).toEqual('fifty-five');
            expect(serviceInstance.transmutate(46).words).toEqual('forty-six');
            expect(serviceInstance.transmutate(37).words).toEqual('thirty-seven');
            expect(serviceInstance.transmutate(28).words).toEqual('twenty-eight');
        });

        it('should transmutate numbers into words: MAGNITUDE CASES', () => {
            expect(serviceInstance.transmutate(1000).words).toEqual('one thousand');
            expect(serviceInstance.transmutate(10000).words).toEqual('ten thousand');
            expect(serviceInstance.transmutate(100000).words).toEqual('one hundred thousand');
            expect(serviceInstance.transmutate(1000000).words).toEqual('one million');
            expect(serviceInstance.transmutate(10000000).words).toEqual('ten million');
            expect(serviceInstance.transmutate(100000000).words).toEqual('one hundred million');
            expect(serviceInstance.transmutate(1000000000).words).toEqual('one billion');
            expect(serviceInstance.transmutate(10000000000).words).toEqual('ten billion');
            expect(serviceInstance.transmutate(100000000000).words).toEqual('one hundred billion');
            expect(serviceInstance.transmutate(1000000000000).words).toEqual('one trillion');
            expect(serviceInstance.transmutate(10000000000000).words).toEqual('ten trillion');
            expect(serviceInstance.transmutate(100000000000000).words).toEqual('one hundred trillion');
            expect(serviceInstance.transmutate(1000000000000000).words).toEqual('one quatrillion');
            // From this point upwards precision is NOT GUARANTEED.
        });

        it('should transmutate numbers into words: EDGE CASES', () => {
            expect(serviceInstance.transmutate(9007199254740991).words)
                // tslint:disable-next-line:max-line-length
                .toEqual('nine quatrillion seven trillion one hundred and ninety-nine billion two hundred and fifty-four million seven hundred and forty thousand nine hundred and ninety-one');
            expect(serviceInstance.transmutate(0).words).toEqual('zero');
            expect(serviceInstance.transmutate(-45).words).toEqual('Negative forty-five');
            expect(serviceInstance.transmutate(-999).words).toEqual('Negative nine hundred and ninety-nine');
        });

        it('should transmutate numbers into words: COMPLEX CASES', () => {
            expect(serviceInstance.transmutate(999).words).toEqual('nine hundred and ninety-nine');
            expect(serviceInstance.transmutate(9999).words).toEqual('nine thousand nine hundred and ninety-nine');
            expect(serviceInstance.transmutate(99999).words).toEqual('ninety-nine thousand nine hundred and ninety-nine');
            expect(serviceInstance.transmutate(999999).words).toEqual('nine hundred and ninety-nine thousand nine hundred and ninety-nine');
            // tslint:disable-next-line:max-line-length
            expect(serviceInstance.transmutate(9999999).words).toEqual('nine million nine hundred and ninety-nine thousand nine hundred and ninety-nine');
            // tslint:disable-next-line:max-line-length
            expect(serviceInstance.transmutate(99999999).words).toEqual('ninety-nine million nine hundred and ninety-nine thousand nine hundred and ninety-nine');
            // tslint:disable-next-line:max-line-length
            expect(serviceInstance.transmutate(999999999).words).toEqual('nine hundred and ninety-nine million nine hundred and ninety-nine thousand nine hundred and ninety-nine');
            // tslint:disable-next-line:max-line-length
            expect(serviceInstance.transmutate(9999999999).words).toEqual('nine billion nine hundred and ninety-nine million nine hundred and ninety-nine thousand nine hundred and ninety-nine');
            // tslint:disable-next-line:max-line-length
            expect(serviceInstance.transmutate(99999999999).words).toEqual('ninety-nine billion nine hundred and ninety-nine million nine hundred and ninety-nine thousand nine hundred and ninety-nine');
            // tslint:disable-next-line:max-line-length
            expect(serviceInstance.transmutate(999999999999).words).toEqual('nine hundred and ninety-nine billion nine hundred and ninety-nine million nine hundred and ninety-nine thousand nine hundred and ninety-nine');
            // tslint:disable-next-line:max-line-length
            expect(serviceInstance.transmutate(9999999999999).words).toEqual('nine trillion nine hundred and ninety-nine billion nine hundred and ninety-nine million nine hundred and ninety-nine thousand nine hundred and ninety-nine');
            // tslint:disable-next-line:max-line-length
            expect(serviceInstance.transmutate(99999999999999).words).toEqual('ninety-nine trillion nine hundred and ninety-nine billion nine hundred and ninety-nine million nine hundred and ninety-nine thousand nine hundred and ninety-nine');
            // tslint:disable-next-line:max-line-length
            expect(serviceInstance.transmutate(999999999999999).words).toEqual('nine hundred and ninety-nine trillion nine hundred and ninety-nine billion nine hundred and ninety-nine million nine hundred and ninety-nine thousand nine hundred and ninety-nine');
        });

        it('should transmutate numbers into words', () => {
            expect(serviceInstance.transmutate(1200).words).toEqual('one thousand two hundred');
            expect(serviceInstance.transmutate(230000).words).toEqual('two hundred and thirty thousand');
            expect(serviceInstance.transmutate(34000).words).toEqual('thirty-four thousand');
        });

        it('should reject any input superior to the system limit', () => {
            // Setup
            const huge = Number.MAX_SAFE_INTEGER + 1; // Warning: unstable operation
            // Act
            const wrapper = () => {
                serviceInstance.transmutate(huge);
            };
            // Assert
            expect(wrapper).toThrow();
            expect(wrapper).toThrowError('Entered number cannot exceed the System Limit');
        });
    });
});

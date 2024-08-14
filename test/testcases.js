
import { expect } from 'chai';
import { parseFileName } from '../main.js'; // Adjust the path as necessary

describe('parseFileName', () => {
    it('should parse a valid filename correctly', () => {
        const testCases = [
            {
                input: '2blueturtleanchor.png',
                expected: {
                    fileName: '2blueturtleanchor.png',
                    quantity: '2',
                    color: 'blue',
                    object: 'turtle',
                    attribute: 'anchor'
                }
            },
            {
                input: '3redfishbubbles.png',
                expected: {
                    fileName: '3redfishbubbles.png',
                    quantity: '3',
                    color: 'red',
                    object: 'fish',
                    attribute: 'bubbles'
                }
            },
            {
                input: '1greenoctopusseaweed.png',
                expected: {
                    fileName: '1greenoctopusseaweed.png',
                    quantity: '1',
                    color: 'green',
                    object: 'octopus',
                    attribute: 'seaweed'
                }
            }
        ];

        testCases.forEach(testCase => {
            const result = parseFileName(testCase.input);
            expect(result).to.deep.equal(testCase.expected);
        });
    });

    it('should return an error for an invalid filename format', () => {
        const result = parseFileName('invalidfilename.png');
        expect(result).to.deep.equal({ error: 'Invalid filename format' });
    });
});
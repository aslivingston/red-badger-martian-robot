import { describe, expect, it } from 'vitest';
import { parseInput } from '../src/parseInput.js';

describe('parseInput', () => {
    it('parses the sample input into structured data', () => {
        const input = 
            `5 3
            1 1 E
            RFRFRFRF
            3 2 N
            FRRFLLFFRRFLL
            0 3 W
            LLFFFLFLFL`;

        expect(parseInput(input)).toEqual({
            marsGrid: {
                maxX: 5,
                maxY: 3
            },
            robots: [
                {
                    x: 1,
                    y: 1,
                    direction: 'E',
                    instructions: ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F']
                },
                {
                    x: 3,
                    y: 2,
                    direction: 'N',
                    instructions: ['F', 'R', 'R', 'F', 'L', 'L', 'F', 'F', 'R', 'R', 'F', 'L', 'L']
                },
                {
                    x: 0,
                    y: 3,
                    direction: 'W',
                    instructions: ['L', 'L', 'F', 'F', 'F', 'L', 'F', 'L', 'F', 'L']
                }
            ]
        });
  });

    it('throws an error for an invalid direction', () => {
        const input = 
            `5 3
            1 1 X
            RFRFRFRF`;

        expect(() => parseInput(input)).toThrow('Invalid robot direction: X');
    });

    it('throws an error for an invalid instruction', () => {
        const input = 
            `5 3
            1 1 E
            RFX`;

        expect(() => parseInput(input)).toThrow('Invalid instruction: X');
    });
});
import { describe, expect, it } from 'vitest';
import { moveForward, controlRobot, turnLeft, turnRight } from '../src/controller.js';

describe('turnLeft', () => {
    it('turns north to west', () => {
        expect(turnLeft('N')).toBe('W');
    });

    it('turns east to north', () => {
        expect(turnLeft('E')).toBe('N');
    });
});

describe('turnRight', () => {
    it('turns north to east', () => {
        expect(turnRight('N')).toBe('E');
    });

    it('turns west to north', () => {
        expect(turnRight('W')).toBe('N');
    });
});

describe('moveForward', () => {
    it('moves north by increasing y', () => {
        expect(moveForward({ x: 1, y: 1, direction: 'N' })).toEqual({
            x: 1,
            y: 2,
            direction: 'N'
        });
    });

    it('moves west by decreasing x', () => {
        expect(moveForward({ x: 1, y: 1, direction: 'W' })).toEqual({
            x: 0,
            y: 1,
            direction: 'W'
        });
    });
});

describe('controlRobot', () => {
    it('executes instructions in order', () => {
        const result = controlRobot({
            x: 1,
            y: 1,
            direction: 'E',
            instructions: ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F']
        });

        expect(result).toEqual({
            x: 1,
            y: 1,
            direction: 'E'
        });
    });

    it('handles turning and moving together', () => {
        const result = controlRobot({
            x: 0,
            y: 0,
            direction: 'N',
            instructions: ['F', 'R', 'F', 'L', 'F']
        });

        expect(result).toEqual({
            x: 1,
            y: 2,
            direction: 'N'
        });
    });
});
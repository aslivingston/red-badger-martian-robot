import { describe, expect, it } from 'vitest';
import { moveForward, controlRobot, turnLeft, turnRight, isOutOfBounds } from '../src/controller.js';

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
        expect(moveForward({ x: 1, y: 1, direction: 'N', lost: false })).toEqual({
            x: 1,
            y: 2,
            direction: 'N',
            lost: false
        });
    });

    it('moves west by decreasing x', () => {
        expect(moveForward({ x: 1, y: 1, direction: 'W', lost: false })).toEqual({
            x: 0,
            y: 1,
            direction: 'W',
            lost: false
        });
    });
});

describe ('isOutOfBounds', () => {
    const marsGrid = { maxX: 5, maxY: 3 };

    it('returns true if x is less than 0', () => {
        expect(isOutOfBounds({ x: -1, y: 1, direction: 'N', lost: false }, marsGrid)).toBe(true);
    });
    
    it('returns true if y is greater than maxY', () => {
        expect(isOutOfBounds({ x: 1, y: 4, direction: 'N', lost: false }, marsGrid)).toBe(true);
    });

    it('returns false if within bounds', () => {
        expect(isOutOfBounds({ x: 2, y: 2, direction: 'N', lost: false }, marsGrid)).toBe(false);
    });
});

describe('controlRobot', () => {
    const marsGrid = { maxX: 5, maxY: 3 };

    it('executes instructions in order', () => {
        const result = controlRobot({
                x: 1,
                y: 1,
                direction: 'E',
                instructions: ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F']
            }, marsGrid
        );

        expect(result).toEqual({
            x: 1,
            y: 1,
            direction: 'E',
            lost: false
        });
    });

    it('handles turning and moving together', () => {
        const result = controlRobot({
            x: 0,
            y: 0,
            direction: 'N',
            instructions: ['F', 'R', 'F', 'L', 'F']
        }, marsGrid);

        expect(result).toEqual({
            x: 1,
            y: 2,
            direction: 'N',
            lost: false
        });
    });

    it('marks robot as lost if it moves out of bounds', () => {
        const result = controlRobot({
            x: 0,
            y: 3,
            direction: 'N',
            instructions: ['F']
        }, marsGrid);

        expect(result).toEqual({
            x: 0,
            y: 3,
            direction: 'N',
            lost: true
        });
    });
});

describe('scent tracking', () => {
    const world = { maxX: 5, maxY: 3 };

    it('adds a scent when a robot is lost', () => {
        const scents = new Set<string>();

        controlRobot(
        {
            x: 3,
            y: 3,
            direction: 'N',
            instructions: ['F']
        },
        world,
        scents
        );

        expect(scents.has('3,3,N')).toBe(true);
    });

    it('ignores a dangerous move when a matching scent exists', () => {
        const scents = new Set<string>(['3,3,N']);

        const result = controlRobot(
        {
            x: 3,
            y: 3,
            direction: 'N',
            instructions: ['F', 'R', 'F']
        },
        world,
        scents
        );

        expect(result).toEqual({
            x: 4,
            y: 3,
            direction: 'E',
            lost: false
        });
    });

});
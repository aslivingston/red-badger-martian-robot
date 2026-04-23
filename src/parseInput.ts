import type { Command, Direction, ParsedInput, RobotInput } from './types.js';

const VALID_DIRECTIONS: Direction[] = ['N', 'E', 'S', 'W'];
const VALID_COMMANDS: Command[] = ['L', 'R', 'F'];

export function parseInput(input: string): ParsedInput {
    const lines = input
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

    if (lines.length < 1) {
        throw new Error('Input is empty');
    }

    const [maxXString, maxYString] = lines[0].split(/\s+/);
    const maxX = Number(maxXString);
    const maxY = Number(maxYString);

    if (Number.isNaN(maxX) || Number.isNaN(maxY)) {
        throw new Error('Invalid mars grid coordinates');
    }

    const robots: RobotInput[] = [];

    for (let i = 1; i < lines.length; i += 2) {
        const positionLine = lines[i];
        const instructionLine = lines[i + 1];

        if (!positionLine || !instructionLine) {
            throw new Error('Each robot must have a position line and an instruction line');
        }

        const [xString, yString, directionString] = positionLine.split(/\s+/);
        const x = Number(xString);
        const y = Number(yString);

        if (Number.isNaN(x) || Number.isNaN(y)) {
            throw new Error('Invalid robot coordinates');
        }

        if (!VALID_DIRECTIONS.includes(directionString as Direction)) {
            throw new Error(`Invalid robot direction: ${directionString}`);
        }

        const instructions = instructionLine.split('') as Command[];

        for (const instruction of instructions) {
            if (!VALID_COMMANDS.includes(instruction)) {
                throw new Error(`Invalid instruction: ${instruction}`);
            }
        }

        robots.push({
            x,
            y,
            direction: directionString as Direction,
            instructions
        });
    }

    return {
        marsGrid: {
            maxX,
            maxY
        },
        robots
    };
}
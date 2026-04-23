import { parseInput } from './parseInput.js';
import { controlRobot, formatOutput } from './controller.js';
import { ScentMap } from './types.js';

const sampleInput = 
    `5 3
    1 1 E
    RFRFRFRF
    3 2 N
    FRRFLLFFRRFLL
    0 3 W
    LLFFFLFLFL`;

const parsed = parseInput(sampleInput);
const scents: ScentMap = new Set();

for (const robot of parsed.robots) {
    const result = controlRobot(robot, parsed.marsGrid, scents);
    console.log(formatOutput(result));
}
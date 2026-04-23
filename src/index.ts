import { parseInput } from './parseInput.js';
import { controlRobot } from './controller.js';

const sampleInput = 
    `5 3
    1 1 E
    RFRFRFRF
    3 2 N
    FRRFLLFFRRFLL
    0 3 W
    LLFFFLFLFL`;

const parsed = parseInput(sampleInput);

for (const robot of parsed.robots) {
    const result = controlRobot(robot);
    console.log(result);
}
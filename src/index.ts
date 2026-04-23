import { parseInput } from './parseInput.js';

const sampleInput = 
    `5 3
    1 1 E
    RFRFRFRF
    3 2 N
    FRRFLLFFRRFLL
    0 3 W
    LLFFFLFLFL`;

const parsed = parseInput(sampleInput);

console.log(parsed);
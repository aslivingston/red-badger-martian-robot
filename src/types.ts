export type Direction = 'N' | 'E' | 'S' | 'W';
export type Command = 'L' | 'R' | 'F';

export interface MarsGrid {
    maxX: number;
    maxY: number;
}

export interface RobotInput {
    x: number;
    y: number;
    direction: Direction;
    instructions: Command[];
}

export interface ParsedInput {
    marsGrid: MarsGrid;
    robots: RobotInput[];
}
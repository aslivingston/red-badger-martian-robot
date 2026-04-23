import type { Command, Direction, RobotInput, RobotState, MarsGrid } from './types.js';

export function turnLeft(direction: Direction): Direction {
    switch (direction) {
        case 'N':
            return 'W';
        case 'W':
            return 'S';
        case 'S':
            return 'E';
        case 'E':
            return 'N';
    }
}

export function turnRight(direction: Direction): Direction {
    switch (direction) {
        case 'N':
            return 'E';
        case 'E':
            return 'S';
        case 'S':
            return 'W';
        case 'W':
            return 'N';
    }
}

export function moveForward(state: RobotState): RobotState {
    switch (state.direction) {
        case 'N':
            return { ...state, y: state.y + 1 };
        case 'E':
            return { ...state, x: state.x + 1 };
        case 'S':
            return { ...state, y: state.y - 1 };
        case 'W':
            return { ...state, x: state.x - 1 };
    }
}

export function isOutOfBounds(state: RobotState, marsGrid: MarsGrid): boolean {
    return state.x < 0 || state.x > marsGrid.maxX || state.y < 0 || state.y > marsGrid.maxY;
}

export function controlRobot(robot: RobotInput, marsGrid: MarsGrid): RobotState {
    let state: RobotState = {
        x: robot.x,
        y: robot.y,
        direction: robot.direction,
        lost: false
    };

    for (const instruction of robot.instructions) {
        if (state.lost) {
            break;
        }

        state = applyInstruction(state, instruction, marsGrid);
    }

    return state;
}

function applyInstruction(state: RobotState, instruction: Command, marsGrid: MarsGrid): RobotState {
    switch (instruction) {
        case 'L':
            return {
                ...state,
                direction: turnLeft(state.direction)
            };
        case 'R':
            return {
                ...state,
                direction: turnRight(state.direction)
            };
        case 'F': {
            const newState = moveForward(state);

            if (isOutOfBounds(newState, marsGrid)) {
                return {
                    ...state,
                    lost: true
                };
            }

            return newState;
        }
    }
}


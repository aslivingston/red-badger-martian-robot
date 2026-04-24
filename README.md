# red-badger-martian-robot

## Martian Robots

### The Problem

The surface of Mars can be modelled by a rectangular grid around which robots are able to move according to instructions provided from Earth.

You are to write a program that determines each sequence of robot positions and reports the final position of the robot.

A robot position consists of:
- A grid coordinate: `(x, y)`
- An orientation: `N`, `S`, `E`, `W` (North, South, East, West)

A robot instruction is a string of the letters:

- **L** — Turn left 90° (no movement)
- **R** — Turn right 90° (no movement)
- **F** — Move forward one grid point in the current direction

The direction **North** corresponds to movement from `(x, y)` to `(x, y+1)`.

There is also a possibility that additional command types may be required in the future, so the solution should allow for extensibility.

---

### Grid Boundaries & Lost Robots

The grid is rectangular and bounded.

If a robot moves off the edge of the grid, it is considered **LOST** and is no longer processed.

However:
- A lost robot leaves a **“scent”** at the last valid position before it was lost.
- Future robots will **ignore** any instruction that would cause them to be lost from a scented position.

---

### Input

The input consists of:

1. The upper-right coordinates of the grid  
   (lower-left is always `(0, 0)`)

2. A sequence of robot positions and instructions:
   - Line 1: starting position and orientation  
   - Line 2: instruction string  

Each robot is processed **sequentially**.

#### Constraints:
- Maximum coordinate value: `50`
- Instruction length: `< 100 characters`

---

### Output

For each robot, output:
- Final position (`x y orientation`)
- If the robot is lost, append: `LOST`

---

### Tech Choices

I used TypeScript because it keeps the robot state, directions, commands and parsed input clearly typed, which helps make the solution easier to read and maintain.

A function based solution was chosen as it helps with readability and made it easier to test. 

I kept the solution intentionally simple with separate concerns. 

---

### Instructions

Install dependencies 
```npm install```

Run program
```npm run dev```

Run tests
```npm test```

---

### Solution

1. Parsing Input: validating input into structured data:
- grid boundaries
- robot definitions

2. Controller: Each robot is processed:
- instructions are applied one at a time
- turning and movement handling implemented

3. Boundary Handling: Forward moves are checked before being applied:
if inside bounds → move
if outside bounds → evaluate scent logic

4. Scent Tracking: Scents are stored as a Set of keys:
- x,y,direction

5. Output Formatting: Final robot states are converted into the required output format:
- x y direction [LOST]

---

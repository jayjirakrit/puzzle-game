// Define action types
type GameAction =
  | { type: "MOVEMENT"; payload: number | null }
  | { type: "RESET" }
  | { type: "SHUFFLE" };

export interface GameState {
  numbers: (number | null)[];
}

/* 
Click Number
Move Direction -> up, down, left, right
down -> index + 3
up -> index - 3
left -> index - 1
right -> index + 1
condition new move index == null -> swap position
optimize skip if not
down -> index < 6 
up ->  index > 2 
left -> index % 3 != 0
right -> index % 3 != 2
*/

function random(numbers: (number | null)[]) {
  return numbers.sort(() => Math.random() - 0.5);
}

function swap(
  numbers: (number | null)[],
  index: number,
  move: number
): (number | null)[] {
  const nullIndex = numbers.indexOf(null);
  if (index + move === nullIndex) {
    const temp = numbers[index];
    numbers[index] = numbers[index + move];
    numbers[index + move] = temp;
  }
  return numbers;
}

// Reducer function
export function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "MOVEMENT": {
      const clickedIndex = action.payload;
      if (clickedIndex == null) return state;
      let swapNumber = state.numbers;
      // Down
      if (clickedIndex < 6) {
        swapNumber = swap(state.numbers, clickedIndex, 3);
      }
      // Up
      if (clickedIndex > 2) {
        swapNumber = swap(state.numbers, clickedIndex, -3);
      }
      // Left
      if (clickedIndex % 3 != 0) {
        swapNumber = swap(state.numbers, clickedIndex, -1);
      }
      // Right
      if (clickedIndex % 3 != 2) {
        swapNumber = swap(state.numbers, clickedIndex, 1);
      }
      return { numbers: swapNumber };
    }
    case "RESET":
      return { numbers: [1, 2, 3, 4, 5, 6, null, 7, 8] };

    case "SHUFFLE": {
      const shuffled = random(state.numbers);
      return { numbers: shuffled };
    }

    default:
      return state;
  }
}

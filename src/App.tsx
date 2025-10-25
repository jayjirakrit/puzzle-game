import { useEffect, useReducer, useState } from "react";
import { reducer } from "./hook/GameReducer"
import type { GameState } from "./hook/GameReducer";
import "./App.css";

// Initial state
const initialState = (): GameState => {
  return { numbers: [1, 2, 3, 4, 5, 6, 7, 8, null] };
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, null],
  });
  const [isWin, setIsWin] = useState<boolean>(false);
  const rows = [0, 3, 6]; // Starting indices for each row

  // Check Winning
  useEffect(() => {
    if (
      JSON.stringify(state.numbers) === JSON.stringify(initialState().numbers)
    )
      setIsWin(true);
    else setIsWin(false);
  }, [state]);

  const handleMv = (num: number | null) => {
    dispatch({ type: "MOVEMENT", payload: num });
  };

  const onReset = () => {
    dispatch({ type: "RESET" });
  };

  const onShuffle = () => {
    dispatch({ type: "SHUFFLE" });
  };

  const renderGameBoard = () => {
    const rowsElements = [];

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const startIndex = rows[rowIndex];
      const rowElements = [];

      // Create 3 tiles for each row
      for (let colIndex = 0; colIndex < 3; colIndex++) {
        const currentIndex = startIndex + colIndex;
        const num = state.numbers[currentIndex];
        rowElements.push(
          <div
            key={currentIndex}
            className="h-30 w-30 border-2 border-black flex items-center justify-center text-5xl text-[#361c0c] rounded-md"
            onClick={() => handleMv(currentIndex)}
          >
            {num}
          </div>
        );
      }

      rowsElements.push(
        <div key={rowIndex} className="flex">
          {rowElements}
        </div>
      );
    }

    return rowsElements;
  };

  return (
    <>
      <div className="flex justify-center text-6xl mb-12 mt-8 font-semibold">
        Puzzle Game
      </div>
      {isWin && (
        <div className="flex justify-center text-6xl text-amber-500 mb-12 mt-8 font-semibold">
          You have Win a Game!!
        </div>
      )}
      <div className="flex justify-center">
        <div className="h-90 w-90 bg-[#EEEEEE] border-2 border-black rounded-md">
          <div className="flex flex-col">{renderGameBoard()}</div>
        </div>
      </div>
      <div className="mt-15 flex justify-end gap-5">
        <div
          className="bg-neutral-400 hover:bg-neutral-700 text-white font-bold py-2 px-5 rounded"
          onClick={onReset}
        >
          reset
        </div>
        <div
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onShuffle}
        >
          shuffle
        </div>
      </div>
    </>
  );
};

export default App;

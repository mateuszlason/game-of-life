import produce from "immer";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "../utils/useForm";

const GameOfLife = () => {
  const [dimensions, setDimensions] = useState({ height: 45, width: 45 });

  const [values, handleChange] = useForm({
    cellSize: 20,
    gridWidth: "",
    gridHeight: "",
    cycle: 150,
  });

  const rowsNum = dimensions.height;
  const colsNum = dimensions.width;

  const [grid, setGrid] = useState(() =>
    Array(rowsNum).fill(Array(colsNum).fill(0))
  );

  const [continuance, setContinuance] = useState(false);
  const continuanceRef = useRef(continuance);
  continuanceRef.current = continuance;

  //this helps to locate each and every neighbour of given cell
  //doesn't include the cell itself (0,0)
  const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
  ];

  const renderGrid = () => {
    // "x" is row index
    // "y" is column index
    return grid.map((rows, x) =>
      rows.map((cols, y) => (
        <div
          className="w-full h-full border border-t-0 border-l-0 border-gray-700"
          key={`${x}-${y}`}
          onClick={() => setLivingCell(x, y)}
          style={{
            backgroundColor: grid[x][y] ? "white" : undefined,
          }}
        />
      ))
    );
  };

  const setLivingCell = (x, y) => {
    const newGen = produce(grid, (genCopy) => {
      //when grid[x][y] is 0, it turns to 1, and the opposite
      genCopy[x][y] = 1 - grid[x][y];
    });
    setGrid(newGen);
  };

  const handleBegining = () => {
    setContinuance(!continuance);
    if (!continuance) {
      continuanceRef.current = true;
      beginGeneration();
    }
  };

  const handleObliviate = () => {
    setGrid(Array(rowsNum).fill(Array(colsNum).fill(0)));
  };

  const handleRandomize = () => {
    let newGen = [...grid];
    for (let x = 0; x < rowsNum; x++) {
      newGen[x] = newGen[x].map((cell) => (cell = Math.random() > 0.8 ? 1 : 0));
    }

    setGrid(newGen);
  };

  const beginGeneration = useCallback(() => {
    if (!continuanceRef.current) return;

    setGrid((g) => {
      return produce(g, (genCopy) => {
        for (let x = 0; x < rowsNum; x++) {
          for (let y = 0; y < colsNum; y++) {
            let neighbours = 0;

            operations.forEach(([i, j]) => {
              const newX = x + i;
              const newY = y + j;
              //checking for valid index, only then adding neighbours
              if (newX >= 0 && newX < rowsNum && newY >= 0 && newY < colsNum)
                neighbours += g[newX][newY];
            });

            if (neighbours < 2 || neighbours > 3) genCopy[x][y] = 0;
            else if (g[x][y] === 0 && neighbours === 3) genCopy[x][y] = 1;
          }
        }
      });
    });
  }, [dimensions, grid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setGrid(
      Array(Number(values.gridHeight)).fill(
        Array(Number(values.gridWidth)).fill(0)
      )
    );
    setDimensions({
      height: Number(values.gridHeight),
      width: Number(values.gridWidth),
    });
  };

  useEffect(() => {
    const handle = setInterval(beginGeneration, values.cycle);

    return () => clearInterval(handle);
  }, [beginGeneration]);

  return (
    <>
      <div
        style={{ backgroundImage: `url(/poster.jpg)` }}
        className="filter blur-lg font-text bg-cover bg-fixed bg-center text-white h-full w-screen"
      >
        <div className="grid grid-cols-3 h-44 border-b-8 border-gray-900 filter blu">
          <div>
            <form className="" onSubmit={handleSubmit}>
              <label htmlFor="gridHeight">Height:</label>
              <input
                value={values.gridHeight}
                name="gridHeight"
                type="number"
                onChange={handleChange}
                className=""
              />

              <label htmlFor="gridWidth">Width:</label>
              <input
                value={values.gridWidth}
                name="gridWidth"
                type="number"
                onChange={handleChange}
                className=""
              />
              <button className="" type="submit">
                Save
              </button>
            </form>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-72 h-24 border-gray-900 border-4 border-t-0 border-opacity-80 bg-gray-800">
              <h1 className="mt-6 text-center font-header text-4xl">
                GAME of LIFE
              </h1>
            </div>
            <div className="flex flex-row">
              <button
                className={continuance ? "btn btn-danger" : "btn btn-success"}
                onClick={handleBegining}
              >
                {continuance ? "Restrain" : "Begin"}
              </button>
              <button className="" onClick={handleObliviate}>
                Obliviate
              </button>
              <button className="" onClick={handleRandomize}>
                Scattershot
              </button>
            </div>
          </div>

          <div className="">
            <h2>Live </h2>
            <label htmlFor="cellSize">Cell size:</label>
            <input
              value={values.cellSize}
              name="cellSize"
              type="number"
              onChange={handleChange}
              className=""
            />

            <label htmlFor="cycle">Cycle's length:</label>
            <input
              value={values.cycle}
              name="cycle"
              type="number"
              onChange={handleChange}
              className=""
            />
          </div>
        </div>

        <div
          className="mt-10 mx-auto grid border border-b-0 border-r-0 border-gray-700 w-min"
          style={{
            grid: `repeat(${dimensions.height}, ${values.cellSize}px)/ repeat(${dimensions.width}, ${values.cellSize}px)`,
          }}
        >
          {renderGrid()}
        </div>
      </div>
    </>
  );
};

export default GameOfLife;

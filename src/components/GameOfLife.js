import {
  faDice,
  faFlagCheckered,
  faHourglassHalf,
  faMeteor,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import produce from "immer";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "../utils/useForm";
import Tutorial from "./Tutorial";
import TutorialButton from "./TutorialButton";
import WikiButton from "./WikiButton";

const GameOfLife = () => {
  const [dimensions, setDimensions] = useState({ height: 30, width: 50 });
  const [tutorialToggle, setTutorialToggle] = useState(true);
  const [values, handleChange] = useForm({
    cellSize: 20,
    gridWidth: "",
    gridHeight: "",
    progression: 150,
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
  const handleToggle = () => {
    setTutorialToggle(!tutorialToggle);
  };

  useEffect(() => {
    const handle = setInterval(beginGeneration, values.progression);

    return () => clearInterval(handle);
  }, [beginGeneration]);

  return (
    <div
      style={{ backgroundImage: `url(/poster.jpg)` }}
      className="flex flex-col font-text bg-cover bg-fixed bg-center text-white min-h-screen min-w-full"
    >
      <div className="backdrop-filter backdrop-blur-md grid grid-cols-3 w-full h-48 2xl:h-52">
        <div className="w-full mt-4">
          {" "}
          <h2 className="text-2xl 2xl:text-3xl mb-2 text-center">
            World size :
          </h2>
          <form
            className="w-full flex flex-col items-center 2xl:text-xl"
            onSubmit={handleSubmit}
          >
            <div className="font-semibold my-2 flex flex-row w-2/3 xl:w-3/5 2xl:w-1/2 justify-between">
              <label htmlFor="gridHeight">Height:</label>
              <input
                value={values.gridHeight}
                name="gridHeight"
                id="gridHeight"
                type="number"
                onChange={handleChange}
                className="ml-2 bg-gray-500 text-right w-1/2 focus:outline-none"
              />
            </div>
            <div className="font-semibold my-2 flex flex-row w-2/3 xl:w-3/5 2xl:w-1/2 justify-between">
              <label htmlFor="gridWidth">Width:</label>
              <input
                value={values.gridWidth}
                name="gridWidth"
                id="gridWidth"
                type="number"
                onChange={handleChange}
                className="ml-2 bg-gray-500 text-right w-1/2 focus:outline-none"
              />
            </div>
            <button
              className="mt-2 bg-gradient-to-r focus:outline-none font-bold from-gray-500 to-gray-800 px-6 py-1 w-2/3 xl:w-3/5 2xl:w-1/2"
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center justify-around bg-gradient-to-r from-gray-500 to-gray-800">
          <h1 className=" font-header text-5xl">GAME of LIFE</h1>

          <div className=" text-gray-900 grid grid-cols-3 gap-3 xl:gap-8 2xl:mt-2 2xl:gap-10">
            <button
              className="flex flex-col hover: text-white items-center text-sm font-bold border-2 rounded-xl hover:bg-gray-900 focus:bg-gray-800 focus:outline-none hover:shadow-inner border-white justify-around h-20 w-28  2xl:text-lg 2xl:h-28 2xl:w-36"
              onClick={handleBegining}
            >
              {" "}
              {continuance ? (
                <>
                  <FontAwesomeIcon icon={faHourglassHalf} size="3x" />
                  Restrain
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faFlagCheckered} size="3x" />
                  Initiate
                </>
              )}
            </button>
            <button
              className="flex flex-col hover: text-white items-center text-sm font-bold border-2 rounded-xl hover:bg-gray-900 focus:outline-none hover:shadow-inner border-white justify-around h-20 w-28  2xl:text-lg 2xl:h-28 2xl:w-36"
              onClick={handleObliviate}
            >
              <FontAwesomeIcon icon={faMeteor} size="3x" />
              Obliviate
            </button>
            <button
              className="flex flex-col hover: text-white items-center text-sm font-bold border-2 rounded-xl hover:bg-gray-900 focus:outline-none hover:shadow-inner border-white justify-around h-20 w-28  2xl:text-lg 2xl:h-28 2xl:w-36"
              onClick={handleRandomize}
            >
              {" "}
              <FontAwesomeIcon icon={faDice} size="3x" />
              Scattershot
            </button>
          </div>
        </div>

        <div className="w-full mt-4 flex flex-col items-center">
          <h2 className="text-2xl 2xl:text-3xl text-center mb-6">
            Live values :
          </h2>
          <div className="font-semibold 2xl:text-xl my-2 flex flex-row w-2/3  xl:w-3/5 2xl:w-1/2 justify-between">
            <label htmlFor="cellSize">Cell size:</label>
            <input
              value={values.cellSize}
              id="cellSize"
              name="cellSize"
              type="number"
              onChange={handleChange}
              className="ml-2  bg-gray-500 text-right focus:outline-none md:w-1/2"
            />
          </div>
          <div className="font-semibold my-2 2xl:text-xl flex flex-row w-2/3 xl:w-3/5 2xl:w-1/2 justify-between">
            <label htmlFor="progression">Speed:</label>
            <input
              value={values.progression}
              name="progression"
              id="progression"
              type="number"
              onChange={handleChange}
              className="ml-2 bg-gray-500 text-right focus:outline-none md:w-1/2"
            />
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-gray-500 to-gray-800 w-full h-2"></div>

      <div
        className="mt-10 mx-auto grid border border-b-0 border-r-0 border-gray-700 w-min"
        style={{
          grid: `repeat(${dimensions.height}, ${values.cellSize}px)/ repeat(${dimensions.width}, ${values.cellSize}px)`,
        }}
      >
        {renderGrid()}
      </div>
      {tutorialToggle && <Tutorial onClick={handleToggle} />}
      <TutorialButton
        className={
          "fixed flex flex-col cursor-pointer items-center bottom-8 right-5 text-gray-300 font-bold"
        }
        text="Tutorial"
        onClick={() => setTutorialToggle(!tutorialToggle)}
      />
      <WikiButton
        className={
          "fixed flex flex-col items-center bottom-8 left-5 text-gray-300 font-bold"
        }
        text="Examples of patterns"
        article={"#Examples_of_patterns"}
      />
    </div>
  );
};

export default GameOfLife;

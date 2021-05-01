import {
  faDice,
  faFlagCheckered,
  faHourglassHalf,
  faMeteor,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import produce from "immer";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { useForm } from "../utils/useForm";
import Tutorial from "./Tutorial";
import TutorialButton from "./TutorialButton";
import WikiButton from "./WikiButton";

console.log("Hello Recruiter! Lookin' sharp as always.. 🤭");
const GameOfLife = () => {
  const [dimensions, setDimensions] = useState({ height: 30, width: 50 });
  const [tutorialToggle, setTutorialToggle] = useState(true);
  const [values, handleChange] = useForm({
    cellSize: 20,
    gridWidth: 50,
    gridHeight: 30,
    speed: 150,
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

  // working on random cell color
  //   const colors = [
  //     "bg-red-600",
  //     "bg-blue-600",
  //     "bg-white",
  //     "bg-greed-600",
  //     "bg-yellow-600",
  //   ];
  //  const randomColor = colors[Math.floor(Math.random() * 5)];

  const renderGrid = useCallback(() => {
    // "x" is row index
    // "y" is column index

    return grid.map((rows, x) =>
      rows.map((cols, y) => (
        <div
          className={
            "w-full h-full border border-t-0 border-l-0 border-gray-700 " +
            (grid[x][y] ? "bg-gray-200" : "")
          }
          key={`${x}-${y}`}
          onClick={() => setLivingCell(x, y)}
        />
      ))
    );
  }, [grid]);

  // using memoized grid version, so it does not re-render without actual change
  const newGrid = useMemo(() => renderGrid(), [renderGrid]);

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

    //producing copy of grid which we can mutate, iterating through each cell
    setGrid((g) => {
      return produce(g, (genCopy) => {
        for (let x = 0; x < rowsNum; x++) {
          for (let y = 0; y < colsNum; y++) {
            let neighbours = 0;
            //adding all possible coordinates from 'operations' array to given cell to find living neighbours
            operations.forEach(([i, j]) => {
              const newX = x + i;
              const newY = y + j;
              //checking for valid index (so it doesn't exceed the dimensions of the grid ), only then adding neighbours
              if (newX >= 0 && newX < rowsNum && newY >= 0 && newY < colsNum)
                neighbours += g[newX][newY];
            });
            // checking Conway's rules of the Game - killing/reviving the cell
            if (neighbours < 2 || neighbours > 3) genCopy[x][y] = 0;
            else if (g[x][y] === 0 && neighbours === 3) genCopy[x][y] = 1;
          }
        }
      });
    });
  }, [dimensions, grid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //setting new dimensions for grid
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
    //setting game's speed (duration of each generation)
    const handle = setInterval(beginGeneration, values.speed);

    return () => clearInterval(handle);
  }, [beginGeneration]);

  return (
    <div
      style={{ backgroundImage: `url(/game-of-life/poster.jpg)` }}
      className={
        "flex flex-col relative bg-black font-text bg-cover pb-8 bg-fixed bg-center text-white min-h-screen min-w-full " +
        (tutorialToggle ? "h-screen overflow-hidden" : "h-full")
      }
    >
      <div className="overflow-x-auto backdrop-filter backdrop-blur-md grid grid-cols-9 w-full h-32 lg:h-48 2xl:h-52">
        <div className="w-full flex flex-col items-center mt-2 lg:mt-4 cols-start-1 col-span-4 xs:col-span-3">
          {" "}
          <h2 className="text-xl lg:text-2xl 2xl:text-3xl mb-1 lg:mb-2 text-center">
            World size :
          </h2>
          <form
            className="w-5/6 xs:w-2/3  xl:w-3/5 2xl:w-1/2 flex flex-col text-sm lg:text-base 2xl:text-xl"
            onSubmit={handleSubmit}
          >
            <div className="my-1 font-normal lg:my-2 flex flex-row justify-between">
              <label htmlFor="gridHeight">Height:</label>

              <input
                value={values.gridHeight}
                name="gridHeight"
                id="gridHeight"
                type="number"
                min="15"
                max="250"
                onChange={handleChange}
                className="bg-gray-500 text-right w-1/2 focus:outline-none"
              />
            </div>
            <div className="my-1 lg:my-2 flex flex-row justify-between">
              <label htmlFor="gridWidth">Width:</label>
              <input
                value={values.gridWidth}
                name="gridWidth"
                id="gridWidth"
                min="15"
                max="250"
                type="number"
                onChange={handleChange}
                className="bg-gray-500 text-right w-1/2 focus:outline-none"
              />
            </div>
            <button
              className="mt-1 lg:mt-2 bg-gradient-to-r focus:outline-none font-bold from-gray-500 to-gray-800 px-6 py-0.5 lg:py-1 "
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
        <div className="cols-start-4 col-span-1 xs:col-span-3 flex flex-col items-center justify-around bg-gradient-to-r from-gray-500 to-gray-800">
          <h1 className="hidden xs:block font-header text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center">
            GAME of LIFE
          </h1>

          <div className="grid w-full xs:w-3/4 lg:w-auto grid-rows-3 xs:grid-rows-none xs:grid-cols-3 gap-2 pt-1 xs:gap-10 lg:gap-3 xl:gap-8 2xl:mt-2 2xl:gap-10">
            <button
              className={
                "flex flex-col text-white items-center justify-around xl:border rounded-xl xl:hover:bg-gray-900 focus:outline-none border-gray-200 xs:w-full lg:h-20 lg:w-28 xl:h-24 2xl:text-xl 2xl:h-28 2xl:w-36 " +
                (continuance ? "xl:bg-gray-800" : "")
              }
              onClick={handleBegining}
            >
              {" "}
              {continuance ? (
                <>
                  <FontAwesomeIcon
                    className="text-3xl xs:text-4xl 2xl:text-5xl"
                    icon={faHourglassHalf}
                  />
                  <span className="hidden lg:block">Restrain</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    className="text-3xl xs:text-4xl 2xl:text-5xl"
                    icon={faFlagCheckered}
                  />
                  <span className="hidden lg:block">Initiate</span>
                </>
              )}
            </button>
            <button
              className="flex flex-col text-white items-center justify-around xl:border rounded-xl xl:hover:bg-gray-900 focus:outline-none border-gray-200 xs:w-full lg:h-20 lg:w-28 xl:h-24 2xl:text-xl 2xl:h-28 2xl:w-36"
              onClick={handleObliviate}
            >
              <FontAwesomeIcon
                className="text-3xl xs:text-4xl 2xl:text-5xl"
                icon={faMeteor}
              />
              <span className="hidden lg:block">Obliviate</span>
            </button>
            <button
              className="flex flex-col text-white items-center justify-around xl:border rounded-xl xl:hover:bg-gray-900 focus:outline-none border-gray-200 xs:w-full lg:h-20 lg:w-28 xl:h-24 2xl:text-xl 2xl:h-28 2xl:w-36"
              onClick={handleRandomize}
            >
              {" "}
              <FontAwesomeIcon
                className="text-3xl xs:text-4xl 2xl:text-5xl"
                icon={faDice}
              />
              <span className="hidden lg:block">Scattershot</span>
            </button>
          </div>
        </div>

        <div className="cols-start-8 col-span-4 xs:col-span-3 w-full mt-2 lg:mt-4 flex flex-col text-sm lg:text-base 2xl:text-xl items-center">
          <h2 className="text-xl lg:text-2xl 2xl:text-3xl text-center mb-2 lg:mb-6">
            Live values :
          </h2>
          <div className="my-2 flex flex-row w-5/6 md:w-2/3 xl:w-3/5 2xl:w-1/2 justify-between">
            <label htmlFor="cellSize">Cell size:</label>
            <input
              value={values.cellSize}
              id="cellSize"
              name="cellSize"
              min="1"
              max="250"
              type="number"
              onChange={handleChange}
              className=" bg-gray-500 text-right w-2/5 xs:w-2/5 md:w-1/2 focus:outline-none"
            />
          </div>
          <div className="my-2 flex flex-row w-5/6 md:w-2/3 xl:w-3/5 2xl:w-1/2 justify-between">
            <label htmlFor="speed">Speed:</label>
            <input
              value={values.speed}
              name="speed"
              min="0"
              max="2000"
              id="speed"
              type="number"
              onChange={handleChange}
              className=" bg-gray-500 text-right w-2/5 md:w-1/2 focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-gray-500 to-gray-800 w-full h-1 lg:h-2"></div>

      <div className="overflow-x-auto min-h-full flex-1 inline-block mt-3 pb-3 lg:mt-8 mx-4 lg:mx-8">
        <div
          className="grid border border-b-0 border-r-0 border-gray-700 w-max mx-auto"
          style={{
            grid: `repeat(${dimensions.height}, ${values.cellSize}px)/ repeat(${dimensions.width}, ${values.cellSize}px)`,
          }}
        >
          {newGrid}
        </div>
      </div>
      {tutorialToggle && <Tutorial onClick={handleToggle} />}
      <TutorialButton
        className={
          "fixed flex flex-col cursor-pointer items-center bottom-5 right-5 lg:bottom-8 lg:right-12 text-gray-300 font-bold"
        }
        text="Tutorial"
        onClick={() => setTutorialToggle(!tutorialToggle)}
      />
      <WikiButton
        className={
          "fixed flex flex-col items-center bottom-5 left-5 lg:bottom-8 lg:left-12 text-gray-300 font-bold"
        }
        text="Patterns"
        article={"#Examples_of_patterns"}
      />
    </div>
  );
};
export default GameOfLife;

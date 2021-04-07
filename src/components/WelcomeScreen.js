import { faThLarge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import WikiButton from "./WikiButton";

const square = (
  <FontAwesomeIcon
    className="align-bottom mr-4 md:mr-10 text-gray-100"
    icon={faThLarge}
    size="xs"
    listitem
  />
);

const WelcomeScreen = () => {
  return (
    <div className="text-white text-justify text-xl sm:font-text flex justify-center items-center z-0 h-screen overflow-hidden w-full bg-black">
      <div className="lg:w-2/3 xl:w-2/3 2xl:w-3/5 2xl:h-5/6 relative flex p-3 opacity-90 flex-col justify-between 2xl:justify-around items-center h-full z-10 bg-black border-gray-900 border-8 border-opacity-50 rounded-md">
        <WikiButton
          text="Wiki article"
          className={
            "text-gray-300 cursor-pointer w-16 h-16 absolute inset-0 lg:inset-3 2xl:inset-8 flex flex-col justify-center items-center sm:w-28 sm:h-28"
          }
        />
        <h1 className="text-center font-header my-8 text-5xl xl:text-6xl">
          GAME of LIFE
        </h1>
        <h2 className="text-2xl xl:text-3xl 2xl:text-3xl mt-5">
          There are only 4 rules :
        </h2>
        <ul className="mt-3 ml-2 sm:px-6 md:leading-relaxed md:px-10 2xl:px-20 text-gray-400 text-lg md:text-xl xl:text-xl 2xl:leading-relaxed space-y-4">
          <li className="inline-flex font-base items-baseline">
            {" "}
            {square}
            <p>
              Any live cell with <b>fewer than two</b> live neighbours dies, as
              if by underpopulation.
            </p>
          </li>{" "}
          <li className="inline-flex items-baseline">
            {square}
            <p>
              Any live cell with <b>two or three</b> live neighbours lives on to
              the next generation.
            </p>
          </li>
          <li className="inline-flex items-baseline">
            {square}
            <p>
              Any live cell with <b>more than three</b> live neighbours dies, as
              if by overpopulation.
            </p>
          </li>
          <li className="inline-flex items-baseline">
            {square}
            <p>
              Any dead cell with <b>exactly three</b> live neighbours becomes a
              live cell, as if by reproduction.
            </p>
          </li>
        </ul>
        <Link
          className="justify-items-end mb-3 w-1/2 2xl:w-1/3 h-12 lg:mt-2"
          to="/game-of-life/play"
        >
          {" "}
          <button className="transition duration-150 transform hover:translate-y-1 hover:scale-105 w-full h-full text-xl 2xl:text-2xl bg-gradient-to-r from-gray-500 to-gray-800">
            Begin
          </button>
        </Link>
      </div>

      <video
        className="z-0 fixed hidden sm:block"
        id="background"
        poster="/game-of-life/poster.jpg"
        autoPlay
        muted
        loop
      >
        <source src="/game-of-life/background.mp4" type="video/mp4"></source>
      </video>
    </div>
  );
};

export default WelcomeScreen;

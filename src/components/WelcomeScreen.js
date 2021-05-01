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
    listitem="true"
  />
);

const WelcomeScreen = () => {
  return (
    <div className="text-white fixed overflow-hidden text-justify text-xl sm:font-text flex justify-center items-center z-0 min-h-screen h-screen w-full bg-black">
      <div className="overflow-y-auto lg:overflow-visible h-screen w-screen px-3 pt-8 pb-16 lg:p-3 lg:w-2/3 xl:w-2/3 2xl:w-3/5 2xl:h-5/6 fixed flex opacity-90 flex-col lg:justify-around items-center z-10 bg-black border-gray-900 border-8 border-opacity-50 rounded-md">
        <WikiButton
          text="Wiki article"
          className={
            "text-gray-300 cursor-pointer w-16 h-16 absolute inset-0 lg:inset-3 2xl:inset-8 flex flex-col justify-center items-center sm:w-28 sm:h-28"
          }
        />
        <h1 className="text-center font-header mt-12 mb-4 text-4xl sm:text-5xl xl:text-6xl">
          GAME of LIFE
        </h1>
        <h2 className="text-2xl xl:text-3xl 2xl:text-3xl mt-5">
          There are only 4 rules :
        </h2>
        <ul className="my-5 ml-2 md:my-3 sm:px-6 md:px-10 2xl:px-20 md:leading-relaxed text-gray-400 text-base sm:text-lg md:text-xl 2xl:leading-relaxed space-y-4">
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
          <button className="transition duration-100 transform focus:outline-none hover:translate-y-1 hover:scale-105 w-full h-full text-xl 2xl:text-2xl bg-gradient-to-r from-gray-500 to-gray-800">
            Begin
          </button>
        </Link>
      </div>

      <video
        className="z-0 fixed hidden md:block"
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

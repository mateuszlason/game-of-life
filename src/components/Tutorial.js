import { faThLarge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const square = (
  <FontAwesomeIcon
    className="hidden md:block align-bottom mr-4 md:mr-10 text-gray-100"
    icon={faThLarge}
    size="xs"
    listitem="true"
  />
);

const Tutorial = ({ onClick }) => {
  return (
    <div className="min-h-screen font-text min-w-full flex justify-center items-center z-20 fixed backdrop-filter backdrop-blur-sm">
      <div className="fixed overflow-y-auto pb-32 sm:pb-16 pt-6 px-5 lg:p-3 z-30 w-screen md:w-4/5 lg:w-3/5 xl:w-1/2 h-screen lg:h-5/6 xl:h-4/5 flex flex-col lg:justify-around items-center  opacity-90 bg-black border-gray-900 border-2 md:border-8 border-opacity-50 rounded-md">
        <h2 className="my-5 lg:m-0 text-2xl 2xl:text-4xl">Tutorial</h2>
        <ul className="text-sm text-justify xl:text-lg 2xl:text-xl text-gray-400 px-2 md:px-3 lg:px-6 space-y-5 lg:space-y-3 2xl:space-y-5 leading-relaxed">
          <li className="inline-flex items-baseline">
            {square}
            <p>
              Set your world's dimensions with <b>height & width </b>
              located on the panel's left. It is best not to exceed the screen
              resolution by using <b>width</b>.
            </p>
          </li>
          <p className="text-sm 2xl:text-md text-gray-200 text-center">
            (Remember to press Save! This will re-generate the world.)
          </p>
          <li className="inline-flex items-baseline">
            {square}{" "}
            <p>
              Center of the panel utilizes commands:{" "}
              <b>Start/Pause, Wipe Out and Randomize</b> the World respectively.
            </p>
          </li>
          <li className="inline-flex items-baseline">
            {square}
            <p>
              You can either use a randomly generated world or click on specific
              cells to make them alive and vice versa. Then start your world by
              pressing <b>Initiate</b>.
            </p>
          </li>
          <li className="inline-flex items-baseline">
            {square}
            <p>
              The right side contains <b>Live Values</b>, which means that any
              interference will result in an <b>immediate change</b> in the
              World. <b>Cell size</b> is counted in pixels, <b>Speed</b> in
              milliseconds (duration of 1 generation).
            </p>
          </li>

          <p className="text-gray-200 font-normal text-center">
            You can bring into being as many cells as you like, but the trick is
            to form a sustainable life using only a few of them!
          </p>
        </ul>
        <button
          className="my-5 lg:my-0 bg-gradient-to-r 2xl:text-xl 2xl:font-bold from-gray-500 to-gray-800 focus:outline-none py-2 2xl:py-3 w-2/3 xl:w-3/5 2xl:w-1/2"
          onClick={onClick}
        >
          Got it!
        </button>
        <div className="absolute h-8 w-8 lg:border-4 lg:border-l-0 lg:border-t-0 border-white z-30 bottom-2 right-2"></div>
      </div>
    </div>
  );
};

export default Tutorial;

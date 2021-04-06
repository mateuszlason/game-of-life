import { faWikipediaW } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const WikiButton = ({ article, className, text }) => {
  return (
    <Link
      to={{
        pathname: `https://en.wikipedia.org/w/index.php?title=Conway%27s_Game_of_Life&oldid=1014218578${article}`,
      }}
      className={className}
      target="_blank"
    >
      <span className="w-14 h-14 flex justify-center items-center bg-gradient-to-r from-gray-500 to-gray-800 rounded-full">
        {" "}
        <FontAwesomeIcon size="lg" icon={faWikipediaW} />
      </span>
      <p className="hidden sm:block mt-1 ">{text}</p>
    </Link>
  );
};

export default WikiButton;

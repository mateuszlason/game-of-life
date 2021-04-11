import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const TutorialButton = ({ onClick, className, text }) => {
  return (
    <div onClick={onClick} className={className}>
      <span className="w-12 h-12 md:w-14 md:h-14 flex justify-center items-center bg-gradient-to-r from-gray-500 to-gray-800 rounded-full">
        {" "}
        <FontAwesomeIcon size="lg" icon={faBookOpen} />
      </span>
      <p className="hidden md:block mt-1 ">{text}</p>
    </div>
  );
};

export default TutorialButton;

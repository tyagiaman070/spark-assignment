import React from "react";
import { FaTimes, FaPen, FaRegCircle } from "react-icons/fa";
const timeColor = "#25CCF7";
const circleColor = "red";

//  Component to change the icon
const Icon = ({ name }) => {
  switch (name) {
    case "circle":
      return <FaRegCircle className="icons" size="25px" color={circleColor} />;
    case "cross":
      return <FaTimes className="icons" size="25px" color={timeColor} />;
    default:
      return <FaPen className="icons" color="#FFF222" />;
  }
};

export default Icon;

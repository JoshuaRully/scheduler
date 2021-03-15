import React from "react";

const classNames = require("classnames");

// helper function for future use
// const spotsFormat = spots => {
//   if (!spots) {
//     return `no spots remaining`;
//   }
//   if (spots === 1) {
//     return `$spots spot remaining`;
//   }
//   return `${spots} spots remaining`;
// }

export default function DayListItem(props) {
  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}
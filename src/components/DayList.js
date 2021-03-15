import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const schedule = props.days.map(daysArr => {
    return (
      <DayListItem
        key={daysArr.id}
        selected={daysArr.name === props.day}
        setDay={props.SetDay}
        {...daysArr}
      />
    )
  });
  return <ul>{schedule}</ul>
};
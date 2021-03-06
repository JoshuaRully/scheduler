import React from 'react';
import 'components/InterviewerListItem.scss';
const classNames = require('classnames');

// responsible for retrieving the interviewer item assets dependent on state of passed props
export default function InterviewerListItem(props) {
  let interviewerStyles = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  let PicStyles = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected
  });

  return (
    <li
      className={interviewerStyles}
      onClick={props.setInterviewer}
    >
      <img
        className={PicStyles}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
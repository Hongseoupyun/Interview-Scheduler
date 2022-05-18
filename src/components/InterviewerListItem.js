import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem(props) {
  const {id,name,avatar,setInterviewer,selected} = props;
  
  const interviewerClass = classNames("interviewers__item",{
    "interviewers__item--selected": selected,
  })
  const imgClass = classNames({
    "interviewers__item-image": avatar,
    "interviewers__item-image--selected-image":avatar && selected
  })
  
  function formatName(name,selected){
    if (selected) {
      return `${name}`
    }
  }

  return (
    <li className={interviewerClass} onClick={()=>{setInterviewer(id)}}>
      <img
        className={imgClass}
        src={avatar}
        alt={name}
      />
      {formatName(name,selected)}
    </li>
  )

}
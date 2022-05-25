import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';


export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props;

  const interviewerListItem = interviewers.map((eachInterviewer)=>{
    return (
      <InterviewerListItem 
      key ={eachInterviewer.id}
      name ={eachInterviewer.name} 
      avatar={eachInterviewer.avatar}
      selected={eachInterviewer.id===value}
      setInterviewer={()=>{onChange(eachInterviewer.id)}} />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">{interviewerListItem}</ul>
    </section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
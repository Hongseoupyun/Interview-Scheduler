import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";


export default function InterviewerList(props) {
  const { interviewers, setInterviewer, interviewer } = props;

  const interviewerListItem = interviewers.map((eachInterviewer)=>{
    return (
      <InterviewerListItem 
      key ={eachInterviewer.id}
      name ={eachInterviewer.name} 
      avatar={eachInterviewer.avatar}
      selected={eachInterviewer.id===interviewer}
      setInterviewer={()=>{setInterviewer(eachInterviewer.id)}} />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light"></h4>
      <ul className="interviewers__list">{interviewerListItem}</ul>
    </section>
  )
}
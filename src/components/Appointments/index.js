import React from 'react'
import 'components/Appointments/styles.scss'
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

export default function Appointment(props) {
  const {time,id,interview} = props;
  const ShoworEmpty = interview?<Show student={interview.student} interviewer = {interview.interviewer}/>:<Empty/>
  return (
    <article className="appointment">
      <Header time = {time}/>
      {ShoworEmpty}
        </article>
  )
  
}
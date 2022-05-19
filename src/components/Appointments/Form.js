
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import React, { useState } from 'react';

export default function Form(props) {

  const {  interviewers, onSave, onCancel } = props;

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  
  const reset = function () {
    return  setStudent(""),  setInterviewer(null)
  }

  const cancel = function(){
    return reset() , onCancel
  }


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event)=> setStudent(event.target.value)}
            value={student}
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={onSave}>Save</Button>
        </section>
      </section>
    </main>
  )
}
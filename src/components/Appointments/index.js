import React from 'react'
import 'components/Appointments/styles.scss'
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import useVisualMode from "hooks/useVisualMode";
import Confirm from './Confirm';
import Error from './Error';
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "Are you sure to delete?"
const EDIT = "EDIT"
const ERROR_DELETE = "ERROR_DELETE"
const ERROR_SAVE = "ERROR_SAVE"

export default function Appointment(props) {
  const { time, interview, id, interviewers, bookInterview, cancelInterview } = props;
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    bookInterview(id, interview)
      .then(() =>
        {transition(SHOW)}
      )
      .catch(error =>{
        console.log("ERROR_SAVE=>", error)
        transition(ERROR_SAVE, true)}
      )
  }

  function cancel() {
    
    transition(DELETING, true)
    cancelInterview(id)
      .then(() => {transition(EMPTY)}
      )
      .catch(error =>{
        console.log("ERROR_DELETE=>", error)
        transition(ERROR_DELETE, true)}
      )
  }
  
  function edit() {
    transition(EDIT)
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (<Form interviewers={interviewers} onCancel={back} onSave={save} />)}
      {mode === SAVING && (<Status message={SAVING} />)}
      {mode === DELETING && (<Status message={DELETING} />)}
      {mode === CONFIRM && (<Confirm message={CONFIRM} onConfirm={cancel} onCancel={back} />)}
      {mode === EDIT && <Form interviewers={interviewers} onCancel={back} onSave={save} interviewer={interview ? interview.interviewer.id : null} student={interview ? interview.student : null} />}
      {mode === ERROR_DELETE && (<Error message={"Error! Something Wrong!"} onClose={back} />)}
      {mode === ERROR_SAVE && (<Error message={"Error! Something Wrong!"} onClose={back} />)}


    </article>
  )

}
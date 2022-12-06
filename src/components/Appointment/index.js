import React from 'react';
import './styles.scss'
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status'
import useVisualMode from '../../hooks/useVisualMode';

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)

    Promise.resolve(props.bookInterview(props.id, interview))
    .then(() => transition(SHOW))
    .catch(err => console.log(err))
  }

  return (
    <article className="appointment">
      <Header time={props.time}/> 
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onCancel = {() => back()}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel = {() => back()}
          onSave = {save}
        />
      )}
      {mode === SAVING && (
        <Status
          message='Saving'
        />
      )}
    </article>
  );
}
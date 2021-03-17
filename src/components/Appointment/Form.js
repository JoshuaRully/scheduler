import React, {useState} from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  // states below
  const [currentName, setName] = useState(props.name || "");
  const [currentInterviewer, setInterviewer] = useState(props.value || null)

  //Helper function to clear all fields
  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  function cancel () {
    reset();
    props.onCancel()
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type={props.message}
            onChange={(event) => setName(event.target.value)}            
            value={currentName}
            placeholder="Enter Student Name"
            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={currentInterviewer} onChange={event => setInterviewer(event)} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onSubmit={event => event.preventDefault()}>Save</Button>
        </section>
      </section>
    </main>
  )
};
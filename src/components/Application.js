import React, { useState, useEffect } from "react";
import "./Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import { getAppointmentsForDay, getInterview} from "helpers/selectors";
const axios = require("axios");

export default function Application() {
  const setDay = day => setState({...state, day});
  const setDays = days => setState(prev => ({ ...prev, days }));

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  Promise.all([
    Promise.resolve(axios.get('http://localhost:8001/api/days')),
    Promise.resolve(axios.get('http://localhost:8001/api/appointments')),
    Promise.resolve(axios.get('http://localhost:8001/api/interviewers'))
  ]).then((all) => {
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
  });

  const appointmentObjects = getAppointmentsForDay(state, state.day);

  const appointment = appointmentObjects.map((appointmentObject) => {
    const interview = getInterview(state, appointmentObjects.interview)
    return (
      <Appointment {...appointmentObject} key={appointmentObject.id} interview={interview}/>
    );
  });

  useEffect(() => {
    axios.get('http://localhost:8001/api/days')
      .then(res => {
        setDays(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointment}
      </section>
    </main>
  );
}

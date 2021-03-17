import React, { useState, useEffect } from "react";
import "./Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
const axios = require("axios");

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "12pm",
    interview: {
      student: "Eren Yeager",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 10,
    time: "1pm",
  },
  {
    id: 8,
    time: "3pm",
  },
  {
    id: 4,
    time: "5pm",
    interview: {
      student: "Levi Ackerman",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "12am",
  }
];

const appointment = appointments.map((appt) => {
  console.log(appt, "appt")
  return (
      <Appointment key={appt.id} id={appt.id} time={appt.time} interview={appt.interview} />
    )
});

export default function Application(props) {
  const setDay = day => setState({...state, day});
  const setDays = days => setState(prev => ({ ...prev, days }));

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  useEffect(() => {
    axios.get('http://localhost:8001/api/days')
      .then(res => {
        setDays(res.data)
      })
      .catch(err => console.log(err))
  }, [])

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
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

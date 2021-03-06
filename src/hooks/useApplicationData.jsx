import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  function setDay(day) {
    setState({...state, day})
  }

  // responsible for axios requests to retrieve data
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ]).then((all) => {
      setState(prev => ({...prev,
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data
      }));
    })
  }, [])
  
  function findDay(day) {
    const weekdays = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return weekdays[day]
  }

  // adds new interview data w/o mutation
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const weekday = findDay(state.day)
    let day = {
      ...state.days[weekday],
      spots: state.days[weekday]
    };
    if (!state.appointments[id].interview) {
      day = {
        ...state.days[weekday],
        spots: state.days[weekday].spots - 1
      }; 
    } else {
      day = {
        ...state.days[weekday],
        spots: state.days[weekday].spots
      };
    };
    let days = state.days
    days[weekday] = day;
    return axios.put(`/api/appointments/${id}`, {interview:interview})
    .then(res => {
        setState({...state, appointments, days})
        return res
    });
  };

  // removes specific interview data w/o mutation
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const weekday = findDay(state.day)
    const day = {
      ...state.days[weekday],
      spots: state.days[weekday].spots + 1
    };
    let days = state.days
    days[weekday] = day;
    return axios.delete(`/api/appointments/${id}`)
    .then(res => {
      setState({...state, appointments, days})
      return res
    });
  };
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
   };
};
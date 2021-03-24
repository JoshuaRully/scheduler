// map through an appointments object and return an array of all objects with that id
const checkIds = (appointments, ids) => {
  const check = ids.map(id => appointments[id]);
  return check;
};

// check and return the appointments in the days obj that are in the appointments object
const getAppointmentsForDay = function(state, day) {
  let apptArr = [];
  // eslint-disable-next-line
  state.days.map(dayObj => {
    if (dayObj.name === day) {
      dayObj.appointments.forEach(apptId => apptArr.push(apptId));
    }
  });
  return checkIds(state.appointments, apptArr);
};

const getInterview = function(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerInfo = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerInfo
  };
};

function getInterviewersForDay(state, day) {

  let interviewersArr = [];
  // eslint-disable-next-line
  state.days.map(dayObj => {
    if (dayObj.name === day) {
      dayObj.interviewers.forEach(interviewerId => interviewersArr.push(interviewerId))
    }
  })
  return checkIds(state.interviewers, interviewersArr);
}

module.exports = { checkIds, getAppointmentsForDay, getInterview, getInterviewersForDay };
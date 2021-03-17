// map through an appointments object and return an array of all objects with that id
const checkIds = (appointments, ids) => {
  const check = ids.map(id => appointments[id]);
  return check;
}

// check and return the appointments in the days obj that are in the appointments object
function getAppointmentsForDay(state, day) {
  let apptArr = [];
  state.days.map(dayObj => {
    if (dayObj.name === day) {
      dayObj.appointments.forEach(apptId => apptArr.push(apptId))
    }
  })
  return checkIds(state.appointments, apptArr);
}

module.exports = { checkIds, getAppointmentsForDay };
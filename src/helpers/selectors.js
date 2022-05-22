
export function getAppointmentsForDay(state, day) {

  const findDay = state.days.find(e =>
    e.name === day
  )
  const appointments = state.appointments
  if (!findDay) {
    return []
  }
  const result = findDay.appointments.map(e => {
    return appointments[e]
  })
  return result
}

export function getInterview(state, interview) {

  return !interview? null: {...interview, interviewer:state.interviewers[interview.interviewer]}
  
}

export function getInterviewersForDay(state, day){
  const findDay = state.days.find(e =>
    e.name === day
  )
  const interviewers = state.interviewers
  if (!findDay) {
    return []
  }
  const result = findDay.interviewers.map(e => {
    return interviewers[e]
  })
 
  return result
}



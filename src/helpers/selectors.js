
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

export default function getInterview(state, interview) {

  return !interview? null: {...interview, interviewer:state.interviewers[interview.interviewer]}
}
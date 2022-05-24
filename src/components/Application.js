import React from "react";
import { Fragment } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointments";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";
import { getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);
  const eachAppointment = getAppointmentsForDay(state, state.day).map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });


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
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <Fragment>
          {eachAppointment}
          <Appointment key="last" time="5pm" />
        </Fragment>
      </section>
    </main>
  );
}

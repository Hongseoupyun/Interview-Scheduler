import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointments";
import { getAppointmentsForDay } from "helpers/selectors";
import {getInterview} from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });
  
  const setDay = (day) => setState({ ...state, day });
  const daliyAppointments = getAppointmentsForDay(state, state.day);
  console.log(daliyAppointments)
  const eachAppointment = daliyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    
    return <Appointment
    key={appointment.id}
    id={appointment.id}
    time={appointment.time}
    interview={interview}
  />;
  });
  
  useEffect(() => {
    const daysURL = "http://localhost:8001/api/days";
    const appointmentsURL = "http://localhost:8001/api/appointments";
    const interviewersURL = "http://localhost:8001/api/interviewers";
    Promise.all([
      axios.get(daysURL), 
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ])
    .then(
      (all) => {
        // console.log("days->",all[0].data);
        // console.log("appointments-->",all[1].data);
        // console.log("interviewers-->",all[2].data)
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }))
      }
    )
    // .then(console.log(state))
    .catch(err=>console.log("error->",err))
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

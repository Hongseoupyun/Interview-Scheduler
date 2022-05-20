
import React, { useState, useEffect } from "react";
import { Fragment } from "react"
import axios from "axios"
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointments";

// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const daliyAppointments =[];
  const setDay = day => setState({ ...state, day });

  
  // const setDays = (days)=>{
  //   setState(prev => ({ ...prev, days }));
  // }

  const eachAppointment = daliyAppointments.map((appointment)=>{
    return (
    <Appointment
    key = {appointment.id}
    {...appointment} 
    />
      )
      
  }) 

  useEffect(()=>{
    const daysURL = "http://localhost:8001/api/days"
    const appointmentsURL = "http://localhost:8001/api/appointments"
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL)
    ]).then((all)=>{
      console.log(all[0].data)
      console.log(all[1].data)
      setState(prev => ({ ...prev, days:all[0].data, appointments:all[1].data}));
    })

    // axios.get(daysURL)
    // .then((res)=>{
    //   // setDays([...res.data])
    //   console.log(res.data)
    // })

  },[])

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
            value={state.day}
            onChange={setDay}
          />
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

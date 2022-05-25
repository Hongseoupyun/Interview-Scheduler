import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

    const countSpotsRemained = (state) => {
      const currentDay = state.days.find((day) => day.name === state.day);
      const appointmentIds = currentDay.appointments;
      const spotsRemained = appointmentIds.filter(
        (id) => !state.appointments[id].interview
      ).length
      return spotsRemained
    };

    const updateSpots = (state, appointments) => {
      const updatedState = { ...state , appointments:appointments };
      const updatedDays = [...state.days];
      const updatedDay = {
        ...state.days.find((day) => day.name === state.day),
      };
    
      const spots = countSpotsRemained(updatedState);
      updatedDay.spots = spots;
      
      const updatedDayIndex = state.days.findIndex(
        (day) => day.name === state.day
      );
      
      updatedDays[updatedDayIndex] = updatedDay;

      return updatedDays
    };
    

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };


    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(
        () => {
          const newDays = updateSpots(state,appointments)
          setState({ ...state, appointments: appointments, days:newDays })
          
        });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };


    return axios
      .delete(`/api/appointments/${id}`)
      .then(
        () => {
          const newDays = updateSpots(state,appointments)
          setState({ ...state, appointments: appointments, days:newDays })
        }
      )
  }
  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    const daysURL = "http://localhost:8001/api/days";
    const appointmentsURL = "http://localhost:8001/api/appointments";
    const interviewersURL = "http://localhost:8001/api/interviewers";
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((err) => console.log("error->", err));
  }, []);
  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}



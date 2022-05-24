import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData () {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    console.log(id, interview);

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(()=>setState({ ...state, appointments: appointments }))
    
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]:appointment
    }

    console.log(id);
    
    return axios
      .delete(`/api/appointments/${id}`)
      .then(()=>setState({ ...state, appointments: appointments }))
      
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
    cancelInterview

    
  }
}
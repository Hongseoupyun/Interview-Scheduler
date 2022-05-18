import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props){
  const {days,setDay} = props;
  const dayListItems = days.map((day)=>{
    return (
      <DayListItem
      key ={day.id}
      name={day.name}
      spots={day.spots}
      selected ={props.day === day.name}
      setDay={setDay} />
    )

  })
  return (
     <ul>
       {dayListItems}
     </ul>
  )
}
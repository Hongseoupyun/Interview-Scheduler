import React from "react";
import "components/DayListItem.scss"
import classNames from "classnames";

export default function DayListItem(props) {
  const {name, spots, selected, setDay} = props
  function formatSpots(spot) {

    if(spots === 0) {
      return 'no spots remaining'
    }
    if(spots === 1) {
      return `${spot} spot remaining`
    }
    else {
      return `${spot} spots remaining`
    }

    
  }
  const dayClass = classNames("day-list__item",{
    "day-list__item--selected":selected,
    "day-list__item--full":spots === 0
  })

  return (
    <li onClick={()=>{setDay(name)}} className={dayClass} selected={selected}>
      <h2 className={"text--regular"} >{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
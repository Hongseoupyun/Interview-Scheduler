import { useState } from "react"

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode,replace=false) {
    setMode(newMode)
    if(replace){
      //replace very last one in history with newMode
      const newHistory = [...history]
      newHistory.pop()
      newHistory.push(newMode)
      setHistory(newHistory)
      
    }
    if(!replace){
       setHistory(prev=>([...prev, newMode]))
    }
  }

  function back(){
    if(mode===initial){
      return
    }
    const newHistory = [...history]
    newHistory.pop()
    setHistory(newHistory)
    setMode(history[newHistory.length-1])
    
  }

  return {
    mode,
    transition,
    back,
    

  }
}
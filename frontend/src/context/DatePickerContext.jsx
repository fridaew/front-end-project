import { useContext,createContext, useState, useEffect } from "react";

const DateContext = createContext()


export function useDate() {
  return useContext(DateContext)
}

export function DateProvider ({ children }) {
  const [selectedDates, setSelectedDates] = useState({startDate:null, endDate:null})

  const updateDates = (dates) =>{
    setSelectedDates(dates)
  }

 return (
    <DateContext.Provider value={{ selectedDates, updateDates }}>
      {children}
    </DateContext.Provider>
  ) 
}








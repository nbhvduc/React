import { useState } from "react";
import { useParams } from "react-router";

export function SalaryDetail() {
  const { year, month } = useParams();
  const yearAsNumber=Number(year)
  const monthAsNumber=Number(month)


  const [currentTime,setCurrentTime]=useState(new Date(yearAsNumber,monthAsNumber))

  const goToPreviousMonth=()=>{
    setCurrentTime((prev)=>{
      const newTime= new Date(prev)

      const newMonth=newTime.getMonth()-1

    newTime.setMonth(newMonth)

      return newTime

    })
   

    }
  }

 
}

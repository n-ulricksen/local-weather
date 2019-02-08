import React from 'react'

export default function CurrentTempDisplay(props) {
  const temperature = Math.round(props.temperature);
  
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
  
  const todayDate = new Date();
  const currentDay = days[todayDate.getDay()];
  const currentMonth = months[todayDate.getMonth()];
  const day = todayDate.getDate();
  const year = todayDate.getFullYear();


  return (
    <div>
      <div className="current-temp-display">
        <div className="date-info" id="current-day">
          { currentDay }
        </div>
        <div id="current-temp">
          { temperature }&#176;
        </div>
        <div className="date-info" id="current-date">
          { currentMonth } { day }, { year }
        </div>
      </div>
    </div>
  )
}

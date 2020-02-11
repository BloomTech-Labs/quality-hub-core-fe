import React, { useState } from "react";
import { Route } from "react-router-dom";
import Calendar from "./Calendar.js";
import WeekView from "./WeekView.js";
import Icon from "../../../../../global/icons/Icon";
import { ICONS } from "../../../../../global/icons/iconConstants";
import "../../../../../InterviewQ/components/LeftNav/LeftNav.scss";
const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isMonthly, setIsMonthly] = useState(true);

  const toggleMonthly = () => {
    setIsMonthly(!isMonthly);
  };

  return (
    <div className="schedule">
      <div className="coachinfo-header">
        <h1>Schedule</h1>
      </div>
      {isMonthly ? (
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          toggleMonthly={toggleMonthly}
        />
      ) : (
        <WeekView
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          toggleMonthly={toggleMonthly}
        />
      )}
    </div>
  );
};

export default Schedule;

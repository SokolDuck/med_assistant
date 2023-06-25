// MedCalendar.js
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

// setup the localizer by providing the moment object to the localizer
const localizer = momentLocalizer(moment);

const MedCalendar = props => {
  const events = [
    // your event array here
    // e.g.
    // {
    //   title: 'Take medication',
    //   start: new Date(),
    //   end: new Date(),
    // }
  ];

  return (
    <div>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: "100vh" }}
      />
    </div>
  );
};

export default MedCalendar;

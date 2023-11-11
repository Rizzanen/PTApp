import { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";

function TrainingCalendar() {
  const [trainings, setTrainings] = useState([]);
  const localizer = dayjsLocalizer(dayjs);
  //trainings data is fetched and modified to include title, start and end parameters to meet the needs of constructing the events for the calendar. finally the data is set to trainings state.
  useEffect(() => {
    fetch("https://traineeapp.azurewebsites.net/api/trainings")
      .then((response) => response.json())
      .then((data) => {
        const trainingData = data.content.map((trainingInfo) => {
          const customerHref = trainingInfo.links.find(
            (link) => link.rel === "customer"
          ).href;

          return fetch(customerHref)
            .then((customerResponse) => customerResponse.json())
            .then((customerData) => {
              const { firstname, lastname } = customerData;

              const title = `${trainingInfo.activity} / ${firstname} ${lastname} `;
              const startDate = dayjs(trainingInfo.date);
              const endDate = startDate.add(trainingInfo.duration, "minute");
              const start = `${startDate}`;
              const end = `${endDate}`;

              return {
                ...trainingInfo,
                title,
                start,
                end,
              };
            })
            .catch((customerErr) => {
              console.error(customerErr);
              return { ...trainingInfo, customerName: "N/A" };
            });
        });

        Promise.all(trainingData)
          .then((trainingEntries) => {
            setTrainings(trainingEntries);
          })
          .catch((error) => console.error(error));
      })
      .catch((err) => console.error(err));
  }, []);

  //set the events for the calendar by mapping through trainings
  const events = trainings.map((training) => ({
    title: training.title,
    start: new Date(training.start),
    end: new Date(training.end),
  }));

  return (
    <div className="calendar">
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="week"
        views={["day", "week", "month"]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 750 }}
      />
    </div>
  );
}

export default TrainingCalendar;

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

function Statistics() {
  const [activities, setActivities] = useState([]);
  //training data is fetched. each activity is added into one object and if it's the same activity, the the duration is added to the existing. Then the object is mapped into an array of objects.
  useEffect(() => {
    fetch("https://traineeapp.azurewebsites.net/api/trainings")
      .then((response) => response.json())
      .then((data) => {
        const activityCounter = {};

        data.content.forEach((training) => {
          const activity = training.activity;

          if (activityCounter[activity]) {
            activityCounter[activity] += training.duration;
          } else {
            activityCounter[activity] = training.duration;
          }
        });
        const uniqueActivities = Object.keys(activityCounter).map(
          (activity) => ({
            name: activity,
            totalDuration: activityCounter[activity],
          })
        );
        setActivities(uniqueActivities);
      })
      .catch((err) => console.error(err));
  }, []);
  //set data for statistics by mapping the activities
  const data = activities.map((activity) => ({
    name: activity.name,
    duration: activity.totalDuration,
  }));

  return (
    <div>
      <div className="statisticsHeader">
        <h1>Total duration of activites booked in minutes</h1>
      </div>
      <div className="statistics">
        <BarChart width={800} height={600} data={data}>
          <Bar dataKey="duration" fill="yellow" />
          <XAxis
            dataKey="name"
            tick={{ fill: "white" }}
            axisLine={{ stroke: "white" }}
            tickLine={{ stroke: "white" }}
          />
          <YAxis
            axisLine={{ stroke: "white" }}
            tick={{ fill: "white" }}
            tickLine={{ stroke: "white" }}
          />
        </BarChart>
      </div>
    </div>
  );
}

export default Statistics;

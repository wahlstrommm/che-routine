import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routine } from "../Types/types";

export default function Summary() {
  const [summaryData, setSummaryData] = useState<Routine[][][]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/summary")
      .then((response) => {
        console.log(response.data); // Check the response data in the console
        setSummaryData(response.data as Routine[][][]);
      })
      .catch((error) => console.error("Error fetching routine summary", error));
  }, []);

  const renderDays = (days: Routine[]) => (
    <ul>
      {days.map((day) => (
        <li key={day.id}>{day.name}</li>
      ))}
    </ul>
  );

  const renderWeeks = (weeks: Routine[][]) => (
    <div>
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex}>
          <h4>Week {weekIndex + 1}</h4>
          {renderDays(week)}
        </div>
      ))}
    </div>
  );

  const renderMonths = (months: Routine[][][] = []) => (
    <div>
      {months.map((month, monthIndex) => (
        <div key={monthIndex}>
          {/* Assuming 'date' is on each day object within the month */}
          <h3>{month[0].day}</h3>
          {renderWeeks(month)}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {/* Example: Display months, weeks, and days */}
      {Array.isArray(summaryData) && summaryData.length > 0 ? (
        renderMonths(summaryData)
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

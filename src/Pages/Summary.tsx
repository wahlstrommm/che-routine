import moment, { MomentInput } from "moment";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routine } from "../Types/types";
import { Week } from "../Types/IWeek";
import { Month } from "../Types/IMonth";
import { Day } from "../Types/IDay";
import { IRoutine } from "../Types/IRoutine";

export default function Summary() {
  const [summaryData, setSummaryData] = useState<Routine[][][]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/summary")
      .then((response) => {
        console.log(response.data);
        setSummaryData(response.data as Routine[][][]);
      })
      .catch((error) => console.error("Error fetching routine summary", error));
  }, []);

  const renderDays = (days: Routine[]) => (
    <ul>
      {days.map((day) => (
        <li key={day.id as number}>{day.Namn || day.Text}</li>
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

  const renderMonths = (months: Routine[][][]) => (
    <div>
      {months.map((month, monthIndex) => (
        <div key={monthIndex}>
          <h3>{`Month: ${moment(month[0].Datum as string).format("MMMM")}`}</h3>
          {renderWeeks(month)}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {Array.isArray(summaryData) && summaryData.length > 0 ? (
        renderMonths(summaryData)
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

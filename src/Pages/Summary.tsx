import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routine } from "../Types/types";

export default function Summary() {
  const [summaryData, setSummaryData] = useState<Routine[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/summary")
      .then((response) => {
        console.log(response.data); // Check the response data in the console
        setSummaryData(response.data as Routine[]);
      })
      .catch((error) => console.error("Error fetching routine summary", error));
  }, []);
  return (
    <div>
      {/* Exempel: Visa månader och antal klara rutiner */}
      {Array.isArray(summaryData) && summaryData.length > 0 ? (
        summaryData.map((month) => (
          <div key={month.name as string}>
            <h3>{month.name}</h3>
            <p>{`${month.completed as string} av ${
              month.total as string
            } rutiner klara`}</p>
            {/* Lägg till interaktivitet här för att visa veckor och dagar */}
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

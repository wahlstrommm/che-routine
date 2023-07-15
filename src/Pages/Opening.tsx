import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routine } from "./Types"; // Ange den korrekta sökvägen till din types.ts-fil
const Opening = () => {
  const [routine, setRoutine] = useState<Routine | null>(null); // Använd den definierade typen här

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await axios.get("../assets/openingRoutine.json");
        setRoutine(response.data as Routine);
      } catch (error) {
        console.error("Error fetching opening routines:", error);
      }
    };

    fetchRoutines().catch((error) => {
      console.error("Unhandled promise rejection:", error);
    });
  }, []);
  return (
    <div>
      <h2>Öppningsrutin</h2>
      {routine && (
        <ul>
          {Object.entries(routine).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Opening;

import React, { useState } from "react";
import { Routine } from "./types";
import openingRoutine from "../assets/openingRoutine.json";

const Opening = () => {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [routines, setRoutines] = useState<Routine[]>([openingRoutine]);

  const handleItemClick = (index: number) => {
    const updatedRoutines = [...routines];
    const updatedItem: Routine = {
      ...updatedRoutines[index],
      Done: !updatedRoutines[index].Done,
    };
    updatedRoutines[index] = updatedItem;
    setRoutines(updatedRoutines);
  };

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const updatedRoutines = [...routines];
    const updatedItem: Routine = { ...updatedRoutines[index], Done: checked };
    updatedRoutines[index] = updatedItem;
    setRoutines(updatedRoutines);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      alert("Vänligen ange ditt namn");
      return;
    }

    // Skapa ett nytt objekt med användarens namn, datum och rutiner
    const newData = {
      Namn: name,
      Datum: new Date().toISOString().split("T")[0],
      Rutiner: routines,
      Anledning: reason,
    };

    // Skapa en JSON-sträng från datan
    const jsonData = JSON.stringify(newData, null, 2);

    // Skapa ett Blob-objekt med JSON-strängen
    const blob = new Blob([jsonData], { type: "application/json" });

    // Skapa en URL för Blob-objektet
    const url = URL.createObjectURL(blob);

    // Skapa en länk för att ladda ner filen
    const link = document.createElement("a");
    link.href = url;
    link.download = `data_${newData.Datum}_oppning.json`;
    link.click();

    // Rensa URL-objektet efter nedladdningen
    URL.revokeObjectURL(url);

    // Rensa anledningsfältet
    setReason("");
  };

  return (
    <div>
      <h2>Öppningsrutin</h2>
      <form onSubmit={handleFormSubmit}>
        <ul>
          {routines.map((item: Routine, index: number) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={item.Done as boolean}
                  onChange={(e) =>
                    handleCheckboxChange(index, e.target.checked)
                  }
                />
                <span
                  style={{
                    textDecoration: item.Done ? "line-through" : "none",
                  }}
                  onClick={() => handleItemClick(index)}
                >
                  Klockan : {item.Klockan}, Viktig : {item.Viktigt}, Klar:{" "}
                  {item.Done ? "Ja" : "Nej"}
                </span>
              </label>
            </li>
          ))}
        </ul>

        <div className="labelAndBtnContainer">
          <div></div>
          {!routines.every((item) => item.Done) && (
            <label>
              Notis :
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </label>
          )}
          <label>
            Namn:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <button type="submit">Spara</button>
        </div>
      </form>
    </div>
  );
};

export default Opening;

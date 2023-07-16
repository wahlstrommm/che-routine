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
    link.download = `data_${newData.Datum}.json`;
    link.click();

    // Rensa URL-objektet efter nedladdningen
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2>Öppningsrutin</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Namn:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
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
        {!routines.every((item) => item.Done) && (
          <div className="label-container">
            <label>
              Varför är inte allt klart?
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </label>
          </div>
        )}
        <button type="submit">Spara</button>
      </form>
    </div>
  );
};

export default Opening;

// const Opening = () => {
//   const [routine, setRoutine] = useState<Routine | null>(null); // Använd den definierade typen här

//   useEffect(() => {
//     const fetchRoutines = async () => {
//       try {
//         const response = await axios.get("../assets/openingRoutine.json");
//         setRoutine(response.data as Routine);
//       } catch (error) {
//         console.error("Error fetching opening routines:", error);
//       }
//     };

//     fetchRoutines().catch((error) => {
//       console.error("Unhandled promise rejection:", error);
//     });
//   }, []);
//   return (
//     <div>
//       <h2>Öppningsrutin</h2>
//       {routine && (
//         <ul>
//           {Object.entries(routine).map(([key, value]) => (
//             <li key={key}>
//               {key}: {value}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Opening;

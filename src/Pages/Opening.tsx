import React, { useEffect, useState } from "react";
import { Routine } from "./types";
//import openingRoutine from "../assets/openingRoutine.json";
import axios from "axios";

const Opening = () => {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  // const [routines, setRoutines] = useState<Routine[]>(openingRoutine);

  const [routines, setRoutines] = useState<Routine[]>();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data: SetRoutines } = await axios.get("/stuff/to/fetch");
  //       setRoutines([routines]);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //     setLoading(false);
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    void getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/opening-routines"
      );
      console.error(response.data);
      // Kontrollera om response.data är en array innan du använder den
      const responseData = response.data as { Rutiner?: any[] };
      if (response.data && Array.isArray(responseData.Rutiner)) {
        setRoutines(responseData.Rutiner);
        // console.warn(response.data);
      } else {
        console.error("Data is not an array:", response.data);
        // Om det inte är en array, sätt routines till en tom array
        setRoutines([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemClick = (index: number) => {
    // Kontrollera om routines är definierad innan du fortsätter
    if (routines) {
      const updatedRoutines = [...routines];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const updatedItem: Routine = {
        ...updatedRoutines[index],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        Done: !updatedRoutines[index].Done,
      };
      updatedRoutines[index] = updatedItem;
      setRoutines(updatedRoutines);

      // Skicka den uppdaterade rutinen till servern
      axios
        .post("http://localhost:3000/opening/update", { index, updatedItem })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Fel vid uppdatering av rutinen:", error);
        });
    }
  };

  const handleCheckboxChange = (index: number, checked: boolean) => {
    if (routines) {
      const updatedRoutines = [...routines];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const updatedItem: Routine = { ...updatedRoutines[index], Done: checked };
      updatedRoutines[index] = updatedItem;
      setRoutines(updatedRoutines);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      alert("Vänligen ange ditt namn");
      return;
    }

    const newData = {
      Namn: name,
      Datum: new Date().toISOString().split("T")[0],
      Rutiner: routines || [], // Tillhandahåll en tom array som standard om routines är undefined
      Anledning: reason,
    };

    // // Skapa en JSON-sträng från datan
    // const jsonData = JSON.stringify(newData, null, 2);

    // // Skapa ett Blob-objekt med JSON-strängen
    // const blob = new Blob([jsonData], { type: "application/json" });

    // // Skapa en URL för Blob-objektet
    // const url = URL.createObjectURL(blob);

    // // Skapa en länk för att ladda ner filen
    // const link = document.createElement("a");
    // link.href = url;
    // link.download = `data_${newData.Datum}_oppning.json`;
    // link.click();

    // // Rensa URL-objektet efter nedladdningen
    // URL.revokeObjectURL(url);
    // setReason("");

    // Skicka data till servern med Axios
    try {
      axios
        .post("http://localhost:3000/opening-routines", newData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Öppningsrutin</h2>
      <form onSubmit={handleFormSubmit}>
        <ul className="listTodo">
          {routines?.map((item: Routine, index: number) => (
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
                  Klockan: {item.Klockan}, Viktig: {item.Viktigt}, Klar:{" "}
                  {item.Done ? "Ja" : "Nej"}
                </span>
              </label>
            </li>
          ))}
        </ul>

        <div className="labelAndBtnContainer">
          <div></div>
          {!routines?.every((item) => item.Done) && (
            <label>
              Notis:
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

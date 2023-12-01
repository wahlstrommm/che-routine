import React, { SetStateAction, useEffect, useState } from "react";
import { Routine } from "./types";
import Modal from "react-overlays/Modal";
//import openingRoutine from "../assets/openingRoutine.json";
import axios from "axios";

const Opening = () => {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  // const [routines, setRoutines] = useState<Routine[]>(openingRoutine);
  const [routines, setRoutines] = useState<Routine[]>();

  useEffect(() => {
    void getData();
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    // Rensa successmeddelandet när modalen stängs
    setSuccessMessage("");
  };

  const handleOverlayButtonClick = () => {
    setShowModal(true);
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/opening-routines"
      );
      // Kontrollera om response.data är en array innan du använder den
      const responseData = response.data as { Rutiner?: any[] };
      if (response.data && Array.isArray(responseData.Rutiner)) {
        setRoutines(responseData.Rutiner);
        console.warn(response.data);
      } else if (response.data && Array.isArray(responseData)) {
        setRoutines(responseData);
        console.warn(response.data);
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
        .post("http://localhost:3000/opening-routines", { index, updatedItem })
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
          console.log(response.data);
          if (typeof response.data === "string") {
            setSuccessMessage(response.data);
          } else {
            setSuccessMessage("Default success message");
          }
          setShowModal(true);
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
      <Modal show={showModal} onHide={handleModalClose}>
        <div className="modal-wrapper">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {successMessage ? "Lyckat!" : "Modal Titel"}
              </h5>
              <button
                type="button"
                className="close"
                onClick={handleModalClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {successMessage ? (
                <p>{successMessage}</p>
              ) : (
                <p>Modal Innehåll (anpassa vid behov)</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleModalClose}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Opening;

import React, { SetStateAction, useEffect, useState } from "react";
import { Routine } from "../Types/types";
import Modal from "react-overlays/Modal";
import axios from "axios";

export default function Special() {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [routines, setRoutines] = useState<Routine[]>();

  const [lastSaved, setLastSaved] = useState("");

  useEffect(() => {
    void getData();
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    // Rensa successmeddelandet när modalen stängs
    setSuccessMessage("");
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/opening-routines"
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const responseData = response.data;
      console.error(response);
      // ...

      if (Array.isArray(responseData)) {
        // Update state with the received routines
        setRoutines(responseData);
        setLastSaved(""); // Set LastSaved to an appropriate default value
        console.warn("HÖE!", responseData);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      } else if (responseData && Array.isArray(responseData.Rutiner)) {
        // Handle the case where there is an updated item
        // ...

        // Update state with the routines directly from responseData.Rutiner
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setRoutines(responseData.Rutiner);

        // ...
      } else {
        console.error("Data is not in the expected format:", responseData);

        // Handle the case where the data is not in the expected format
        // Update state with responseData.Rutiner or an empty array if it doesn't exist
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setRoutines(responseData.Rutiner || []);
        setLastSaved("");
      }

      // ...
    } catch (error) {
      console.log("Error fetching data:", error);

      // Handle the error, e.g., show an error message to the user
    }
  };

  const handleItemClick = (index: number) => {
    if (routines) {
      const updatedRoutines = [...routines];
      const updatedItem: Routine = {
        ...updatedRoutines[index],
        Done: !updatedRoutines[index].Done,
      };
      updatedRoutines[index] = updatedItem;
      setRoutines(updatedRoutines);

      axios
        .post("http://localhost:3000/opening-routines", { index, updatedItem })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Error updating routine:", error);
        });
    }
  };

  const handleCheckboxChange = (index: number, checked: boolean): void => {
    if (routines) {
      const updatedRoutines: Routine[] = [...routines];
      const updatedItem: Routine = { ...updatedRoutines[index], Done: checked };
      updatedRoutines[index] = updatedItem;
      setRoutines(updatedRoutines);

      setCompletedTodos((prevCompleted: Routine[]): Routine[] =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        checked && updatedItem.Id
          ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            [...prevCompleted, updatedItem.Id.toString()]
          : // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            prevCompleted.filter((id) => id !== updatedItem.Id.toString())
      );

      // Make an API call to update the server immediately
      axios
        .post("http://localhost:3000/opening-routines", updatedRoutines)
        .then((response) => {
          console.error(response.data);
        })
        .catch((error) => {
          console.log("Error updating routines:", error);
        });
    }
  };

  return (
    <div>
      <div>
        <h2>Öppningsrutin</h2>
        {lastSaved !== "" && <p>Senaste sparad: {lastSaved}</p>}
      </div>
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
          <button type="submit" disabled={isSaveButtonDisabled()}>
            Spara
          </button>
        </div>
      </form>
      <Modal show={showModal} onHide={handleModalClose} backdrop={true}>
        <div className={`modal-blur ${showModal ? "modal-open" : ""}`}>
          {showModal && (
            <div className="modal-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    onClick={handleModalClose}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h5 className="modal-title">
                    {successMessage ? "Lyckat!" : "Modal Titel"}
                  </h5>
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
          )}
        </div>
      </Modal>
    </div>
  );
}

import React, { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-overlays/Modal";
import { Routine } from "../Types/types";
import { ClosingResponse } from "../Types/IClosingResponse";

export default function Closning() {
  const [reason, setReason] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [name, setName] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [completedTodos, setCompletedTodos] = useState<Routine[]>([]);
  const [routines, setRoutines] = useState<Routine[]>();
  const [lastSaved, setLastSaved] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getData();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    void fetchData();
  }, []);

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

      setHasChanges(true);
    }
  };

  const handleItemClick = (index: number) => {
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
          console.error(response.data);
        })
        .catch((error) => {
          console.log("Fel vid uppdatering av rutinen:", error);
        });
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSuccessMessage("");
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      alert("Vänligen ange ditt namn");
      return;
    }

    const savedTime = new Date().toLocaleString() + "";

    const newData = {
      Namn: name,
      Datum: new Date().toISOString().split("T")[0],
      Rutiner: routines || [], // Tillhandahåll en tom array som standard om routines är undefined
      SenastSparad: savedTime,
      Anledning: reason,
    };
    try {
      axios
        .post("http://localhost:3000/opening-routines", newData)
        .then((response) => {
          console.log(response.data);
          console.log(response.data);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (
            response.data &&
            typeof response.data === "object" &&
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            response.data.success === true
          ) {
            const responseDataTime = response.data as {
              SenastSparad: SetStateAction<string>;
            };
            setSuccessMessage(responseDataTime.SenastSparad);
            setLastSaved(savedTime);
          } else {
            setSuccessMessage(
              typeof response.data === "string"
                ? response.data
                : "Default success message"
            );
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

  const isSaveButtonDisabled = () => {
    //disable the button is send is sucess or no new todo is checked
    return (
      successMessage !== "" || !(routines && routines.some((item) => item.Done))
    );
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/closing-routines"
      );

      const responseData = response.data as ClosingResponse;

      if (response.data && Array.isArray(responseData.Rutiner)) {
        setRoutines(responseData.Rutiner);
        setLastSaved(responseData?.SenastSparad ?? "");
      } else {
        console.error("Data is not an array:", response.data);
        console.warn(response.data);
        setRoutines(responseData.Rutiner);
        // setRoutines([]);
      }
    } catch (error) {
      console.error("Error fetching closing routines:", error);
    }
  };

  return (
    <div>
      <div>
        <h2>Avslutningsrutin</h2>
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

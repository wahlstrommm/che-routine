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

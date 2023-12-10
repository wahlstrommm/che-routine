import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-overlays/Modal";
import { Routine } from "../Types/types";
import { ClosingResponse } from "../Types/IClosingResponse";
export default function Closning() {
  const [reason, setReason] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [routines, setRoutines] = useState<Routine[]>();
  const [completedTodos, setCompletedTodos] = useState<Routine[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
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

  const handleModalClose = () => {
    setShowModal(false);
    setSuccessMessage("");
  };

  const handleOverlayButtonClick = () => {
    setShowModal(true);
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
      } else if (response.data && Array.isArray(responseData)) {
        setRoutines(responseData);
      } else {
        console.error("Data is not an array:", response.data);
        setRoutines([]);
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
    </div>
  );
}

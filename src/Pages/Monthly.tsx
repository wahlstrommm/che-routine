import React from "react";

export default function Monthly() {
  const isSaveButtonDisabled = () => {
    //disable the button is send is sucess or no new todo is checked
    return (
      successMessage !== "" || !(routines && routines.some((item) => item.Done))
    );
  };
  return (
    <div>
      <div>
        <h2>Månadsrutin</h2>
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

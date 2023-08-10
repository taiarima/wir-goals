import { useState } from "react";
import SuccessMessage from "./SuccessMessage";
import Button from "./Button";

export default function LogActivity({
  selectedGoal,
  handleLogNewActivity,
  setShowLogActivity,
  className,
}) {
  // Get today's date for default value of date
  const today = new Date();
  // Format it as YYYY-MM-DD
  const formattedDate = today.toISOString().split("T")[0];

  const [showSuccess, setShowSuccess] = useState(false);

  const [unitsToLog, setUnitsToLog] = useState("");
  const [newDate, setNewDate] = useState(formattedDate);
  const [newNotes, setNewNotes] = useState("");

  const [invalidUnitsError, setInvalidUnitsError] = useState("");

  function validateUnitsLogged(e) {
    const val = e.target.value;

    if (val === "") {
      setUnitsToLog("");
      setInvalidUnitsError(null);
      return;
    }

    if (!isNaN(val) && isFinite(val) && val > 0) {
      setUnitsToLog(val);
      setInvalidUnitsError(null);
    } else {
      setInvalidUnitsError(
        `Please enter a valid amount of ${selectedGoal?.units.toLowerCase()} to log`
      );
    }
  }

  function submitActivity() {
    if (!unitsToLog) {
      setInvalidUnitsError(
        `Please enter a valid amount of ${selectedGoal?.units.toLowerCase()} to log`
      );
      return;
    }

    handleLogNewActivity(selectedGoal, unitsToLog, newDate, newNotes);
    setUnitsToLog("");
    setNewDate(formattedDate);
    setNewNotes("");
    setShowSuccess(true);
    setInvalidUnitsError(null);

    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  }

  return (
    <div className={`goal-container ${className}`}>
      {showSuccess && <SuccessMessage>Activity Logged</SuccessMessage>}
      <div className="relative text-center">
        <h1 className="font-subtitle">Log New Activity</h1>
        <span
          onClick={() => setShowLogActivity(false)}
          className="absolute top-0 right-0 -mt-2 mr-2 cursor-pointer"
        >
          &times;
        </span>
      </div>
      <div className="flex flex-col justify-center items-center mb-4">
        <label className="text-2xl border border-white p-2 rounded">
          {selectedGoal?.emoji} {selectedGoal?.name}
        </label>
        <p className="text-base">{selectedGoal?.desc}</p>
        {/* <input className="text-black rounded ml-4 p-2" type="text"></input> */}
      </div>
      <div className="text-left m-4 text-lg flex flex-col font-bold">
        <div className="flex justify-between items-center">
          <label>{selectedGoal?.units} to log:</label>
          <input
            value={unitsToLog}
            onChange={validateUnitsLogged}
            className="text-black rounded ml-4 p-2 log-activity-input"
            type="text"
          ></input>
          {/* <p className="ml-1 p-2">Units</p> */}
        </div>
        <div className="flex justify-between items-center mt-4">
          <label>Notes (optional):</label>
          <input
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
            className="text-black rounded ml-4 p-2 log-activity-input"
            type="text"
            maxLength="300"
          ></input>
          {/* <p className="ml-1 p-2">Units</p> */}
        </div>
        <div className="flex justify-between items-center mt-4">
          <label>Date:</label>
          <input
            className="rounded ml-4 text-black p-2"
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            max={formattedDate}
          ></input>
        </div>
        {invalidUnitsError && <div className="error">{invalidUnitsError}</div>}
      </div>
      <Button onClick={submitActivity}>Submit</Button>
    </div>
  );
}

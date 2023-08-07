import { useState } from "react";
import Button from "./Button";

export default function LogActivity({
  goalList,
  selectedGoal,
  handleLogNewActivity,
}) {
  // Get today's date for default value of date
  const today = new Date();
  // Format it as YYYY-MM-DD
  const formattedDate = today.toISOString().split("T")[0];

  const [unitsToLog, setUnitsToLog] = useState("");
  const [newDate, setNewDate] = useState(formattedDate);
  const [newNotes, setNewNotes] = useState("");

  return (
    <div className="goal-container">
      <h1 className="font-subtitle">Log New Activity</h1>
      <div className="flex justify-center items-center mb-4">
          <label className="text-2xl border border-white p-2 rounded">
            {selectedGoal?.emoji} {selectedGoal?.name}
          </label>
          {/* <input className="text-black rounded ml-4 p-2" type="text"></input> */}
        </div>
      <div className="text-left m-4 text-lg flex flex-col font-bold">
        
        <div className="flex justify-between items-center">
          <label>{selectedGoal?.units} to log:</label>
          <input
            value={unitsToLog}
            onChange={(e) => setUnitsToLog(Number(e.target.value))}
            className="text-black rounded ml-4 p-2 "
            type="text"
          ></input>
          {/* <p className="ml-1 p-2">Units</p> */}
        </div>
        <div className="flex justify-between items-center mt-4">
          <label>Notes (optional):</label>
          <input
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
            className="text-black rounded ml-4 p-2 "
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
      </div>
      <Button
        onClick={() => {
          handleLogNewActivity(selectedGoal, unitsToLog, newDate, newNotes);
          setUnitsToLog("");
          setNewDate(formattedDate);
          setNewNotes("");
        }}
      >
        Submit
      </Button>
    </div>
  );
}

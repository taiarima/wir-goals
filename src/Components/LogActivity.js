import Button from "./Button";

export default function LogActivity() {
  // Get today's date for default value of date
  const today = new Date();
  // Format it as YYYY-MM-DD
  const formattedDate = today.toISOString().split("T")[0];

  return (
    <div className="goal-container">
      <h1 className="font-subtitle">Log Activity</h1>
      <div className="text-left m-4 text-lg flex flex-col font-bold">
        <div className="flex justify-between items-center mb-4">
          <label className="text-xl">Goal Name</label>
          {/* <input className="text-black rounded ml-4 p-2" type="text"></input> */}
        </div>
        <div className="flex justify-between items-center">
          <label>Units accomplished:</label>
          <input className="text-black rounded ml-4 p-2 " type="text"></input>
          {/* <p className="ml-1 p-2">Units</p> */}
        </div>
        <div className="flex justify-between items-center mt-4">
          <label>Date:</label>
          <input
            className="rounded ml-4 text-black p-2"
            type="date"
            value={formattedDate}
          ></input>
        </div>
      </div>
      <Button>Submit</Button>
    </div>
  );
}

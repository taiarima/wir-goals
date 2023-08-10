import Button from "./Button";
import { useState } from "react";
import SuccessMessage from "./SuccessMessage";

export default function AddGoalForm({ setShowAddGoal, onSetGoalList, nextId }) {
  const todayDate = new Date().toLocaleDateString();

  const [goalName, setGoalName] = useState("");
  const [goalDesc, setGoalDesc] = useState("");
  const [goalUnits, setGoalUnits] = useState("");
  const [dailyQuota, setDailyQuota] = useState("");
  const [goalEmoji, setGoalEmoji] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);

  function createNewGoal() {
    if (!goalName || !goalDesc || !goalUnits || !dailyQuota || !goalEmoji) {
      setError("All fields must be filled out.");
      return;
    }

    const newGoal = {
      id: nextId,
      name: goalName,
      emoji: goalEmoji,
      desc: goalDesc,
      accUnits: 0,
      units: goalUnits,
      activityLog: [],
      dateCreated: todayDate,
      quota: dailyQuota,
    };
    onSetGoalList(newGoal);

    // Reset all fields after submission
    setGoalName("");
    setGoalDesc("");
    setGoalUnits("");
    setDailyQuota("");
    setGoalEmoji("");

    setShowSuccess(true);
    setError(null);

    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  }

  const handleNumberInput = (e) => {
    const val = e.target.value;

    if (val === "") {
      setDailyQuota("");
      setError(null);
      return;
    }

    if (!isNaN(val) && isFinite(val) && val > 0) {
      setDailyQuota(val);
      setError(null);
    } else {
      setError("Please enter a valid number");
    }
  };

  return (
    <div className="goal-container overflow-y-auto">
      {showSuccess && <SuccessMessage>New Goal Added</SuccessMessage>}
      <div className="relative text-center">
        <h1 className="font-subtitle">Add New Goal</h1>
        <span
          onClick={() => setShowAddGoal(false)}
          className="absolute top-0 right-0 -mt-2 mr-2 cursor-pointer"
        >
          &times;
        </span>
      </div>
      <form className="bg-blue-600 p-6 rounded w-full max-w-md mx-auto text-base">
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            className="text-black shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="title"
            placeholder="e.g., Spanish Reading"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="icons-select"
            className="block text-white text-sm font-bold mb-2"
          >
            Choose an icon:
          </label>
          <select
            name="icons"
            id="icons-select"
            className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setGoalEmoji(e.target.value)}
          >
            <option value="">--Please choose an icon--</option>
            <option value="🌱">🌱 Personal Growth</option>
            <option value="📚">📚 Education</option>
            <option value="📖">📖 Reading</option>
            <option value="💪">💪 Fitness</option>
            <option value="💰">💰 Finance/Saving</option>
            <option value="🎸">🎸 Musical</option>
            <option value="🍏">🍏 Diet</option>
            <option value="🌍">🌍 Travel/Exploration</option>
            <option value="🎨">🎨 Art/Creativity</option>
            <option value="💡">💡 Ideas/Innovations</option>
            <option value="🤝">🤝 Relationships</option>
            <option value="🗣️">🗣️ Social/Language Learning</option>
            <option value="🏃">🏃 Running/Exercise</option>
            <option value="🚭">🚭 Quit Smoking</option>
            <option value="🚱">🚱 Quit Drinking</option>
            <option value="⏹️">⏹️ General</option>
            <option value="🪅">🪅 Just for fun</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="details"
          >
            Descriptive details:
          </label>
          <input
            className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="details"
            placeholder="e.g., 'Read at least 10 pages from Spanish textbook"
            value={goalDesc}
            onChange={(e) => setGoalDesc(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="units"
          >
            Units of measurement:
          </label>
          <input
            className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="units"
            placeholder="e.g., pages, hours, minutes entries, sessions"
            value={goalUnits}
            onChange={(e) => setGoalUnits(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="dailyGoal"
          >
            Daily Goal (in specified units):
          </label>
          <input
            className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="dailyGoal"
            placeholder="e.g., 1, 10, 100"
            value={dailyQuota}
            onChange={handleNumberInput}
          />
        </div>

        <div className="mb-">
          <p className="text-white">Date created: {todayDate}</p>
        </div>
        {error && <div className="error">{error}</div>}
      </form>

      <Button onClick={createNewGoal}>Submit</Button>
    </div>
  );
}

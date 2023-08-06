import Title from "./Components/Title";
import LogActivity from "./Components/LogActivity";
import GoalList from "./Components/GoalList";
import Footer from "./Components/Footer";
import { useState } from "react";

function App() {
  const goalObjects = [
    {
      id: 1,
      emoji: "🪅",
      name: "Study Korean",
      units: "hours",
      accUnits: 27,
      lastUpdated: "04 AUG 2023",
    },
    {
      id: 2,
      emoji: "🏋️",
      name: "Work out",
      units: "days",
      accUnits: 10,
      lastUpdated: "01 AUG 2023",
    },
    {
      id: 3,
      emoji: "📖",
      name: "Read literature",
      units: "pages",
      accUnits: 42,
      lastUpdated: "28 JUL 2023",
    },
    {
      id: 4,
      emoji: "🎹",
      name: "Practice piano",
      units: "hours",
      accUnits: 27,
      lastUpdated: "01 AUG 2023",
    },
    {
      id: 5,
      emoji: "🥵",
      name: "Stay sober",
      units: "days",
      accUnits: 13,
      lastUpdated: "13 JUL 2023",
    },
  ];

  const [goalList, setGoalList] = useState(goalObjects);

  function onSetGoalList(newGoal) {
    setGoalList([...goalList, newGoal]);
  }

  return (
    <div className="bg-blue-600 h-screen">
      <Title />
      <div className="flex flex-row p-4 justify-center">
        <GoalList goalList={goalList} onSetGoalList={onSetGoalList} />
        <LogActivity goalList={goalList} />
      </div>
      <Footer />
    </div>
  );
}

export default App;

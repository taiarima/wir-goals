import Button from "./Button";
import Goal from "./Goal";

export default function GoalList() {
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

  return (
    <div className="goal-container">
      <h1 className="font-subtitle">Goal List</h1>
      <ul>
        {goalObjects.map((goal) => (
          <Goal goal={goal} key={goal.id} />
        ))}
      </ul>
      <Button>Add New Goal</Button>
    </div>
  );
}

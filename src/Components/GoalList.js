
import Button from "./Button";
import Goal from "./Goal";

export default function GoalList({goalList}) {
  

  return (
    <div className="goal-container">
      <h1 className="font-subtitle">Goal List</h1>
      <ul>
        {goalList.map((goal) => (
          <Goal goal={goal} key={goal.id} />
        ))}
      </ul>
      <Button>Add New Goal</Button>
    </div>
  );
}

import Button from "./Button";
import Goal from "./Goal";
import GoalOverview from "./GoalOverview";

export default function GoalList({
  goalList,
  selectedGoal,
  handleSelectedGoal,
}) {
  return (
    <div className="goal-container overflow-y-auto">
      <h1 className="font-subtitle">Goal List</h1>
      <ul>
        {goalList.map((goal) =>
          goal === selectedGoal ? (
            <GoalOverview goal={goal} />
          ) : (
            <Goal
              goal={goal}
              key={goal.id}
              selectedGoal={selectedGoal}
              handleSelectedGoal={handleSelectedGoal}
            />
          )
        )}
      </ul>
      <Button>Add New Goal</Button>
    </div>
  );
}

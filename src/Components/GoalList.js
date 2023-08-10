import Button from "./Button";
import Goal from "./Goal";
import GoalOverview from "./GoalOverview";

export default function GoalList({
  goalList,
  selectedGoal,
  handleSelectedGoal,
  onSetShowAddGoal,
  showAddGoal,
  onSetShowLogActivity,
  showLogActivity,
}) {
  return (
    <div className="goal-container overflow-y-auto">
      <h1 className="font-subtitle">Goal List</h1>
      {goalList.length > 1 && (
        <ul>
          {goalList.map((goal) =>
            goal === selectedGoal ? (
              <GoalOverview
                goal={goal}
                handleSelectedGoal={handleSelectedGoal}
                onSetShowLogActivity={onSetShowLogActivity}
                onSetShowAddGoal={onSetShowAddGoal}
                showAddGoal={showAddGoal}
                key={goal.id}
              />
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
      )}
      <Button
        onClick={() => {
          onSetShowAddGoal((prevShowAddGoal) => {
            if (showLogActivity) {
              onSetShowLogActivity(false);
            }
            return !prevShowAddGoal;
          });
        }}
      >
        Add New Goal
      </Button>
    </div>
  );
}

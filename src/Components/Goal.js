export default function Goal({ goal, selectedGoal, handleSelectedGoal }) {
  const isSelected = selectedGoal?.id === goal.id;
  let appliedStyle = "";
  if (isSelected) {
    appliedStyle = "rounded cursor-pointer bg-yellow-400 hover:bg-sky-300";
  } else if (goal.id === 0) {
    appliedStyle = "bg-white border border-yellow-500";
  } else {
    appliedStyle = "rounded cursor-pointer bg-white hover:bg-gold";
  }

  return (
    <li
      onClick={() => handleSelectedGoal(goal)}
      className={`grid grid-cols-4 text-base text-blue-700  m-2 ${appliedStyle}`}
    >
      <div>{goal.emoji}</div>
      <div>{goal.name}</div>
      <div>{goal.lastUpdated}</div>
      <div>
        {goal.accUnits} {goal.units}
      </div>
    </li>
  );
}

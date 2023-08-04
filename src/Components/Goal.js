export default function Goal({ goal }) {
  return (
    <li className="grid grid-cols-4 text-base bg-white text-blue-700 rounded m-2 cursor-pointer hover:bg-yellow-200">
      <div>{goal.emoji}</div>
      <div>{goal.name}</div>
      <div>{goal.lastUpdated}</div>
      <div>
        {goal.accUnits} {goal.units}
      </div>
    </li>
  );
}

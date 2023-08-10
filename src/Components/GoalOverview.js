import Button from "./Button";

export default function GoalOverview({
  goal,
  handleSelectedGoal,
  onSetShowLogActivity,
  onSetShowAddGoal,
  showAddGoal,
}) {
  const daysWithActivity = getDaysWithActivitySinceCreation(
    goal.activityLog,
    goal.dateCreated
  );
  const activeDaysPercentage = getPercentageOfActiveDays(
    goal.dateCreated,
    daysWithActivity
  );
  const longestStreak = calcLongestStreak(goal.activityLog);
  const bestDay = mostProductiveDay(goal.activityLog);
  const averagePerDay = Math.round(goal.accUnits / goal.activityLog.length);

  function getDaysWithActivitySinceCreation(activityLog, creationDateStr) {
    // Sort the activityLog by date
    const sortedLog = [...activityLog].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Find the index of the first entry on or after the creation date
    const creationDate = new Date(creationDateStr);
    const startIndex = sortedLog.findIndex(
      (activity) => new Date(activity.date) >= creationDate
    );

    // If no entry on or after the creation date is found, return 0
    if (startIndex === -1) return 0;

    // Return the length of the items from startIndex to the end
    return sortedLog.length - startIndex;
  }

  function getPercentageOfActiveDays(dateCreatedStr, daysWithActivity) {
    // Convert dateCreated to a Date object
    const dateCreated = new Date(dateCreatedStr);

    // Get the current date and set the time to midnight
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Find the difference in milliseconds between the current date and the created date
    const differenceInMs = currentDate - dateCreated;

    // Convert the difference from milliseconds to days
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

    if (differenceInDays === 0) return 100;

    // Return the percentage
    return Math.round((daysWithActivity / differenceInDays) * 100);
  }

  function calcLongestStreak(activityLog) {
    if (activityLog.length === 0) return 0;

    // First, sort the activity log by date without mutating the original array.
    const sortedLog = [...activityLog].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    let currentStreak = 1;
    let longestStreak = 1;

    sortedLog.forEach((log, index) => {
      if (index === 0) return; // Skip the first iteration

      const currentDate = new Date(log.date);
      const previousDate = new Date(sortedLog[index - 1].date);
      previousDate.setDate(previousDate.getDate() + 1);

      if (currentDate.getTime() === previousDate.getTime()) {
        currentStreak++;
      } else {
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
        currentStreak = 1;
      }
    });

    // Ensure we haven't missed a new longest streak at the end
    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
    }

    return longestStreak;
  }

  function mostProductiveDay(activityLog) {
    if (activityLog.length === 0) return null;

    let maxUnits = 0;
    let mostProductive = null;

    activityLog.forEach((entry) => {
      const loggedUnits = Number(entry.loggedUnits);
      if (loggedUnits > maxUnits) {
        maxUnits = loggedUnits;
        mostProductive = entry;
      }
    });

    return mostProductive;
  }

  return (
    <div className="bg-white text-base text-blue-700 rounded p-4 m-2 relative">
      <div
        onClick={() => handleSelectedGoal(goal)}
        className="mb-4 flex flex-col justify-center items-center relative bg-blue-500 text-white  cursor-pointer"
      >
        <h2 className="font-bold mb-2 text-2xl">{goal.name}</h2>
        <h3 className="text-base">{goal.desc}</h3>
        <h2 className="text-2xl absolute left-4 p-2 top-1/2 transform -translate-y-1/2">
          {goal.emoji}
        </h2>
      </div>

      <div className="flex justify-between">
        <p>Created: {goal.dateCreated ?? "Yesterday"}</p>
        <p>Last Updated: {goal.lastUpdated ?? "No activity logged yet"}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mt-2">Activity Statistics:</h3>
        <p>
          📅 Days with activity: {goal.activityLog.length}
          {daysWithActivity > 0 && (
            <span className="ml-2 text-sm">({activeDaysPercentage}%)</span>
          )}
        </p>
        <p>
          🔥 Longest streak:{" "}
          {longestStreak > 0 ? longestStreak + " days" : "No data yet"}
        </p>
        <p>
          🏆 Most productive:{" "}
          {bestDay
            ? `${bestDay.loggedUnits} ${goal.units} on ${new Date(
                bestDay.date
              ).toLocaleDateString()}`
            : "No data yet"}
        </p>
      </div>

      <div>
        <h3 className="font-semibold mt-2">Overall Progress:</h3>
        <p>
          📈 Accumulated:{" "}
          {goal.accUnits > 0 ? `${goal.accUnits} ${goal.units}` : "No data yet"}
        </p>
        <p>
          📊 Average per day:{" "}
          {averagePerDay > 0 ? `${averagePerDay} ${goal.units}` : "No data yet"}
        </p>
      </div>
      <div className="border border-blue-500 inline-block rounded m-2">
        <Button
          onClick={() => {
            onSetShowLogActivity((prevShowLogActivity) => {
              if (showAddGoal) {
                onSetShowAddGoal(false);
              }
              return !prevShowLogActivity;
            });
          }}
        >
          Log New Activity
        </Button>
      </div>
    </div>
  );
}

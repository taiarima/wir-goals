export default function GoalOverview({ goal }) {
  const daysWithActivity = goal.activityLog.length;
  const activeDaysPercentage = getPercentageOfActiveDays(
    goal.dateCreated,
    daysWithActivity
  );
  const longestStreak = calcLongestStreak(goal.activityLog);
  const bestDay = mostProductiveDay(goal.activityLog);
  const averagePerDay = Math.round(goal.accUnits / daysWithActivity);

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
    <div className="bg-white text-base text-blue-700 rounded p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">{goal.name}</h2>
        <div className="flex justify-between">
          <p>Created: {goal?.dateCreated ?? "Yesterday"}</p>
          <p>Last Updated: {goal.lastUpdated}</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Activity Stats:</h3>
        <p>
          📅 Days with activity: {daysWithActivity}
          <span className="ml-2 text-sm">({activeDaysPercentage}%)</span>
        </p>
        <p>🔥 Longest streak: {longestStreak} days</p>
        <p>
          🏆 Most productive: {bestDay.loggedUnits} hours
          <span className="ml-2 text-sm">
            on {new Date(bestDay.date).toLocaleDateString()}
          </span>
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Overall Progress:</h3>
        <p>
          📈 Accumulated: {goal.accUnits} {goal.units}
        </p>
        <p>
          📊 Average per day: {averagePerDay} {goal.units}
        </p>
      </div>
    </div>
  );
}

import Title from "./Components/Title";
import LogActivity from "./Components/LogActivity";
import GoalList from "./Components/GoalList";
import Footer from "./Components/Footer";
import AddGoalForm from "./Components/AddGoalForm";
import { useState, useEffect } from "react";

function App() {
  const goalObjects = [
    {
      id: 0,
      emoji: "🌱",
      name: "Goal",
      units: "Total Activity",
      lastUpdated: "Last Updated",
    },
    // {
    //   id: 1,
    //   emoji: "🪅",
    //   name: "Study Korean",
    //   desc: "Read 10 pages every day",
    //   quota: 10,
    //   dateCreated: "01 JAN 2023",
    //   units: "Hours",
    //   accUnits: 27,
    //   activityLog: [
    //     {
    //       date: "2023-08-01",
    //       loggedUnits: "2",
    //       notes: "Started with basic vocabulary.",
    //     },
    //     {
    //       date: "2023-08-02",
    //       loggedUnits: "3",
    //       notes: "Reviewed sentence structure.",
    //     },
    //     {
    //       date: "2023-08-03",
    //       loggedUnits: "4",
    //       notes: "Struggled with verb conjugation.",
    //     },
    //     {
    //       date: "2023-08-04",
    //       loggedUnits: "5",
    //       notes: "Focused on listening exercises.",
    //     },
    //     {
    //       date: "2023-08-06",
    //       loggedUnits: "1",
    //       notes: "Quick review of earlier topics.",
    //     },
    //     {
    //       date: "2023-08-07",
    //       loggedUnits: "2",
    //       notes: "Started a new chapter on family.",
    //     },
    //     {
    //       date: "2023-08-10",
    //       loggedUnits: "4",
    //       notes: "Practiced speaking with a partner.",
    //     },
    //   ],
    //   lastUpdated: "04 AUG 2023",
    // },
    // {
    //   id: 2,
    //   emoji: "🏋️",
    //   name: "Work out",
    //   units: "Days",
    //   accUnits: 10,
    //   activityLog: [{ date: "04 AUG 2023", loggedUnits: "4" }],
    //   lastUpdated: "04 AUG 2023",
    // },
    // {
    //   id: 3,
    //   emoji: "📖",
    //   name: "Read literature",
    //   units: "Pages",
    //   accUnits: 42,
    //   activityLog: [{ date: "04 AUG 2023", loggedUnits: "4" }],
    //   lastUpdated: "04 AUG 2023",
    // },
    // {
    //   id: 4,
    //   emoji: "🎹",
    //   name: "Practice piano",
    //   units: "Hours",
    //   accUnits: 27,
    //   activityLog: [{ date: "04 AUG 2023", loggedUnits: "4" }],
    //   lastUpdated: "04 AUG 2023",
    // },
    // {
    //   id: 5,
    //   emoji: "🥵",
    //   name: "Stay sober",
    //   units: "Days",
    //   accUnits: 13,
    //   activityLog: [{ date: "04 AUG 2023", loggedUnits: "4" }],
    //   lastUpdated: "04 AUG 2023",
    // },
  ];

  function formatDateToCustom(dateString) {
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const dateParts = dateString.split("-");
    const year = dateParts[0];
    const month = months[parseInt(dateParts[1], 10) - 1];
    // const day = parseInt(dateParts[2], 10); // Remove leading zeros from days less than 10.
    // return `${day} ${month} ${year}`;
    return `${dateParts[2]} ${month} ${year}`;
  }

  const [goalList, setGoalList] = useState(() => {
    const storedGoalList = localStorage.getItem("goalList");
    return storedGoalList ? JSON.parse(storedGoalList) : goalObjects;
  });

  useEffect(() => {
    localStorage.setItem("goalList", JSON.stringify(goalList));
  }, [goalList]);

  function handleLogNewActivity(goal, unitsToLog, newDate, newNotes) {
    setGoalList((goalList) =>
      goalList.map((currGoal) => {
        if (currGoal === goal) {
          currGoal.accUnits = currGoal.accUnits += Number(unitsToLog);

          // Find an entry in the activityLog that matches the newDate
          let entry = currGoal.activityLog.find(
            (entry) => entry.date === newDate
          );

          if (entry) {
            // If an entry with the given date exists, update its loggedUnits and notes
            entry.loggedUnits += Number(unitsToLog);
            entry.notes += `, ${newNotes}`; // Assuming you want to append new notes with a comma
          } else {
            // Otherwise, add a new entry to the activityLog
            currGoal.activityLog.push({
              date: newDate,
              loggedUnits: Number(unitsToLog),
              notes: newNotes,
            });
          }

          const today = new Date();
          currGoal.lastUpdated = formatDateToCustom(
            today.toISOString().split("T")[0]
          );
          return currGoal;
        } else {
          return currGoal;
        }
      })
    );
  }

  function onSetGoalList(newGoal) {
    setGoalList([...goalList, newGoal]);
  }

  const [selectedGoal, setSelectedGoal] = useState(null);

  function handleSelectedGoal(goal) {
    if (goal?.id === 0) return;
    setSelectedGoal((curr) => (curr?.id === goal.id ? null : goal));
  }
  useEffect(() => {
    if (!selectedGoal) {
      setShowLogActivity(false);
    }
  }, [selectedGoal]);

  const [showLogActivity, setShowLogActivity] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768 && (showLogActivity || showAddGoal)) {
      // const halfwayDown = window.innerHeight / 2;
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  }, [showLogActivity, showAddGoal]);

  return (
    <div className="bg-blue-600 min-h-screen">
      <Title />
      <div className="flex flex-col md:flex-row p-4 justify-center items-center">
        <GoalList
          goalList={goalList}
          onSetGoalList={onSetGoalList}
          handleSelectedGoal={handleSelectedGoal}
          selectedGoal={selectedGoal}
          onSetShowAddGoal={setShowAddGoal}
          showAddGoal={showAddGoal}
          onSetShowLogActivity={setShowLogActivity}
          showLogActivity={showLogActivity}
          className="w-full md:w-1/2"
        />
        {showLogActivity ? (
          <LogActivity
            goalList={goalList}
            selectedGoal={selectedGoal}
            handleLogNewActivity={handleLogNewActivity}
            setShowLogActivity={setShowLogActivity}
            className="w-full md:w-1/2"
          />
        ) : (
          false
        )}
        {showAddGoal ? (
          <AddGoalForm
            setShowAddGoal={setShowAddGoal}
            onSetGoalList={onSetGoalList}
            className="w-full md:w-1/2"
            nextId={goalList.length}
          />
        ) : (
          false
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;

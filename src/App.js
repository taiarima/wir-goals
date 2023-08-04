import Title from "./Components/Title";
import GoalLog from "./Components/GoalLog";
import GoalList from "./Components/GoalList";
import Goal from "./Components/GoalList";
import Button from "./Components/Button";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="bg-blue-600 h-screen">
      <Title />
      <div className="flex flex-row p-4 justify-center">
        <GoalList />
        <GoalLog />
      </div>
      <Footer />
    </div>
  );
}

export default App;

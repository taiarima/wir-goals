import Button from "./Button";

export default function AddGoalForm() {
  const todayDate = new Date().toLocaleDateString();
  return (
    <div className="goal-container overflow-y-auto">
      <h1 className="font-subtitle">Add New Goal</h1>
      <form className="bg-blue-600 p-6 rounded w-full max-w-md mx-auto text-base">
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            className="text-black shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="title"
            placeholder="e.g., Spanish Reading"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="details"
          >
            Descriptive details:
          </label>
          <input
            className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="details"
            placeholder="e.g., 'Read at least 10 pages from Spanish textbook"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="units"
          >
            Units of measurement:
          </label>
          <input
            className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="units"
            placeholder="e.g., pages, hours, minutes entries, sessions"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="dailyGoal"
          >
            Daily Goal (in specified units):
          </label>
          <input
            className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="dailyGoal"
            placeholder="e.g., 1, 10, 100"
          />
        </div>

        <div className="mb-4">
          <p className="text-white">Date created: {todayDate}</p>
        </div>
      </form>
      <Button>Submit</Button>   
    </div>
  );
}

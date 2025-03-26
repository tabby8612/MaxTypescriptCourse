import CourseGoals from "./Components/CourseGoals";
import Header from "./Components/Header";
import NewGoal from "./Components/NewGoal";
import goalImg from "./assets/goals.jpg";
import { useState } from "react";

export default function App() {
  const img = {
    src: goalImg,
    alt: "Goal Image",
  };

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "First Goal",
      description: "This is first goal",
    },
    {
      id: 2,
      title: "Second Goal",
      description: "Third Goal",
    },
  ]);

  function deleteHandle(id: number) {
    console.log(id);
    setGoals((prevGoals) => {
      const filteredArr = prevGoals.filter((el) => el.id != id);
      return filteredArr;
    });
  }

  function handleAddGoal(title: string, description: string) {
    setGoals((prevGoals) =>
      prevGoals.concat({
        id: Math.random(),
        title,
        description,
      })
    );
  }

  return (
    <main>
      <Header image={img}>
        <h1>Goals</h1>
      </Header>
      <NewGoal onAdd={handleAddGoal} />

      <CourseGoals goals={goals} delFn={deleteHandle} />
    </main>
  );
}

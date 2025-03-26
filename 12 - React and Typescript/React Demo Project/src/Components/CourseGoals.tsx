import { type ReactNode } from "react";

type Goal = {
  id: number;
  title: string;
  description: string;
};

interface CourseGoalsProps {
  goals: Goal[];
  delFn: (id: number) => void;
  children?: ReactNode;
}

export default function CourseGoals({ goals, delFn }: CourseGoalsProps) {
  return (
    <ul>
      {goals.map((goal) => (
        <li key={goal.id}>
          <article>
            <div>
              <h2>{goal.title}</h2>
              <p>{goal.description}</p>
              <button
                onClick={() => {
                  delFn(goal.id);
                }}>
                Delete
              </button>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

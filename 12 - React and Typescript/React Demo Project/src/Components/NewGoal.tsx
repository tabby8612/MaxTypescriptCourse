import { useRef, type FormEvent } from "react";

interface newGoalProps {
  onAdd: (text: string, summary: string) => void;
}

export default function NewGoal({ onAdd }: newGoalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    console.log(event);

    const title = titleRef.current!.value;
    const description = descriptionRef.current!.value;

    // After Validating
    onAdd(title, description);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title: </label>
      <input type="text" name="title" ref={titleRef} />
      <label htmlFor="description">Description: </label>
      <input type="text" name="description" ref={descriptionRef} />
      <input type="submit" value="Submit Form" />
    </form>
  );
}

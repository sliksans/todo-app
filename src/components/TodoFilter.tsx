import { FunctionComponent } from "react";
import { Todo } from "../tools/TodoRepository";

export type FilterState = "all" | "active" | "completed";
const filterStates: FilterState[] = ["all", "active", "completed"];

type TodoFilterProps = {
  filterState: FilterState;
  setfilterState: (state: FilterState) => void;
};

export const filterTodos = (filterState: FilterState) => (todo: Todo) => {
  if (filterState === "all") {
    return true;
  }
  if (filterState === "active") {
    return !todo.completed;
  }
  if (filterState === "completed") {
    return todo.completed;
  }
  return true;
};

const TodoFilter: FunctionComponent<TodoFilterProps> = ({
  filterState,
  setfilterState,
}) => {
  return (
    <div className="my-4 flex w-[424px] justify-between">
      {filterStates.map((state) => (
        <button
          key={state}
          className={`filter-button${filterState === state ? "--active" : ""}`}
          onClick={() => setfilterState(state)}
        >
          {state}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;

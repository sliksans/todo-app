import { FunctionComponent, useMemo, useState } from "react";
import { Todo } from "../tools/TodoRepository";
import TodoListPlaceholder from "./TodoListPlaceholder";
import ErrorCard from "./ErrorCard";
import TodoCard from "./TodoCard";
import TodoFilter, { FilterState, filterTodos } from "./TodoFilter";

type TodoListProps = {
  todos: Todo[];
  todoError: string;
  loadingTodos: boolean;
  setTodoError: (error: string) => void;
  completeTodo: (todoId: string) => void;
  deleteTodo: (todoId: string) => void;
};

const TodoList: FunctionComponent<TodoListProps> = ({
  todos,
  todoError,
  loadingTodos,
  setTodoError,
  completeTodo,
  deleteTodo,
}) => {
  const [filterState, setfilterState] = useState<FilterState>("all");
  const filteredTodos = useMemo(
    () => todos.filter(filterTodos(filterState)),
    [todos, filterState],
  );

  return (
    <>
      <TodoFilter filterState={filterState} setfilterState={setfilterState} />
      <ul className="my-4 w-[424px]">
        {todoError && (
          <li className="flex justify-center">
            <ErrorCard error={todoError} onClose={() => setTodoError("")} />
          </li>
        )}
        {filteredTodos.map((todo, i) => (
          <TodoCard
            key={todo.id || i}
            todo={todo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
          />
        ))}
        <TodoListPlaceholder
          loadingTodos={loadingTodos}
          todoListEmpty={!filteredTodos.length}
        />
      </ul>
    </>
  );
};

export default TodoList;

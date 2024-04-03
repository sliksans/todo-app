import { FunctionComponent } from "react";
import { Todo } from "../tools/TodoRepository";
import { MdDeleteOutline } from "react-icons/md";

type TodoCardProps = {
  todo: Todo;
  filteredId: string;
  completeTodo: (todoId: string) => void;
  deleteTodo: (todoId: string) => void;
};

const TodoCard: FunctionComponent<TodoCardProps> = ({
  todo,
  filteredId,
  completeTodo,
  deleteTodo,
}) => {
  console.log("todo completed:", todo.completed);
  return (
    <div className="my-4 flex min-w-[424px] items-center justify-between rounded-md bg-violet-400 px-4 py-2 text-white shadow-md transition-all duration-200 ease-out hover:shadow-lg">
      <input
        className="size-4 rounded-md accent-violet-800"
        type="checkbox"
        checked={todo.completed}
        onChange={() =>
          completeTodo(todo.id ? (todo.id as string) : filteredId)
        }
      />
      <div className={`grow overflow-hidden text-ellipsis px-4 ${todo.completed && "line-through"}`}>
        {todo.text}
      </div>
      <button
        className="transition-all duration-200 ease-out hover:text-red-600"
        onClick={() => deleteTodo(todo.id ? (todo.id as string) : filteredId)}
      >
        <MdDeleteOutline fontSize={24} />
      </button>
    </div>
  );
};

export default TodoCard;

import { FunctionComponent } from "react";
import { Todo } from "../tools/TodoRepository";
import { MdDeleteOutline } from "react-icons/md";

type TodoCardProps = {
  todo: Todo;
  completeTodo: (todoId: string) => void;
  deleteTodo: (todoId: string) => void;
};

const TodoCard: FunctionComponent<TodoCardProps> = ({
  todo,
  completeTodo,
  deleteTodo,
}) => {
  return (
    <div className="my-4 flex min-w-[424px] items-center justify-between rounded-md bg-violet-400 px-4 py-2 text-white shadow-md transition-all duration-200 ease-out hover:shadow-lg">
      <input
        className="size-4 rounded-md accent-violet-800"
        type="checkbox"
        checked={todo.completed}
        onChange={() =>
          completeTodo(todo.id as string)
        }
      />
      <div className={`grow overflow-hidden text-ellipsis px-4 ${todo.completed && "line-through"}`}>
        {todo.text}
      </div>
      <button
        className="transition-all duration-200 ease-out hover:text-red-600"
        onClick={() => deleteTodo(todo.id as string)}
      >
        <MdDeleteOutline fontSize={24} />
      </button>
    </div>
  );
};

export default TodoCard;

import { FunctionComponent, useContext } from "react";
import { AuthContext, AuthValue } from "../context/AuthContext";
import { CgSpinner } from "react-icons/cg";

type TodoListPlaceholderProps = {
  loadingTodos: boolean;
  todoListEmpty: boolean;
};

const TodoListPlaceholder: FunctionComponent<TodoListPlaceholderProps> = ({
  loadingTodos,
  todoListEmpty,
}) => {
  const { user, loadingUser } = useContext(AuthContext) as AuthValue;

  return (
    <li className="my-4 flex justify-center text-center text-sm text-violet-500">
      {loadingUser ? (
        <CgSpinner className="animate-spin text-3xl" />
      ) : user && loadingTodos ? (
        <CgSpinner className="animate-spin text-3xl" />
      ) : todoListEmpty ? (
        "todo list is empty..."
      ) : null}
    </li>
  );
};

export default TodoListPlaceholder;

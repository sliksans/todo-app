import { FunctionComponent } from "react";
import { MdOutlineAdd } from "react-icons/md";

type TodoInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

const TodoInput: FunctionComponent<TodoInputProps> = ({
  value,
  onChange,
  onSubmit,
}) => {
  return (
    <div className="inline-flex overflow-hidden rounded-md text-white shadow-md transition-all duration-200 ease-out focus-within:shadow-lg focus-within:shadow-violet-500/50">
      <input
        className="w-96 bg-violet-500 px-4 py-2 outline-none transition-all duration-200 ease-out focus:bg-violet-400"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
      />
      <button
        className="flex w-10 items-center justify-center bg-violet-800"
        onClick={() => onSubmit()}
      >
        <MdOutlineAdd className="text-2xl" />
      </button>
    </div>
  );
};

export default TodoInput;

import { useContext, useState, useEffect } from "react";
import { AuthContext, AuthValue } from "./context/AuthContext";
import TodoRepository from "./tools/TodoRepository";
import { Todo } from "./tools/TodoRepository";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [todoError, setTodoError] = useState<string>("");
  const [newTodo, setNewTodo] = useState<string>("");
  const { user } = useContext(AuthContext) as AuthValue;

  useEffect(() => {
    if (!user) {
      setTodos([]);
      return;
    }

    setLoadingTodos(true);
    const unsubscribe = TodoRepository.subscribeToTodoUpdates(
      user.uid,
      (updatedTodos) => {
        setTodos(updatedTodos);
        setLoadingTodos(false);
      },
      (error) => {
        setTodoError(error.message);
        setLoadingTodos(false);
      },
    );

    return () => unsubscribe();
  }, [user]);

  const addTodo = async () => {
    if (newTodo === "") return;

    if (!user) {
      setTodos([
        ...todos,
        { text: newTodo, completed: false, id: Math.random().toString() },
      ]);
      setNewTodo("");
      return;
    }

    const todo = newTodo;
    setNewTodo("");
    const result = await TodoRepository.addTodo(user.uid, {
      text: todo,
      completed: false,
    });
    if (result) setTodoError(result.message);
  };

  const deleteTodo = async (todoId: string) => {
    if (!user) {
      setTodos(todos.filter((todo) => todo.id !== todoId));
      return;
    }
    const result = await TodoRepository.deleteTodo(user.uid, todoId);
    if (result) setTodoError(result.message);
  };

  const completeTodo = async (todoId: string) => {
    if (!user) {
      setTodos(
        todos.map((todo) =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
      return;
    }
    const todo = todos.find((t) => t.id === todoId);
    if (!todo) return;
    const result = await TodoRepository.updateTodo(user.uid, todoId, {
      ...todo,
      completed: !todo.completed,
    });
    if (result) setTodoError(result.message);
  };

  return (
    <div>
      <Header />
      <main className="mb-12 mt-20 flex justify-center">
        <section className="mt-8 flex max-w-3xl flex-col items-center justify-center">
          <h2 className="m-2 text-center text-xl font-medium">
            Add a new todo:
          </h2>
          <TodoInput value={newTodo} onChange={setNewTodo} onSubmit={addTodo} />
          <TodoList
            todos={todos}
            todoError={todoError}
            loadingTodos={loadingTodos}
            setTodoError={setTodoError}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
          />
        </section>
      </main>
    </div>
  );
}

export default App;

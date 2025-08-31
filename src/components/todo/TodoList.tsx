import { CheckCircle } from "lucide-react"
import TodoItem from "./TodoItem"
import { Todo } from "@/types/todo.types"

interface TodoListProps {
  todos: Todo[];
  startEditing: (todo: Todo) => void;
  handleDeleteTodo: (id: number) => void;
}

export default function TodoList({ todos, startEditing, handleDeleteTodo }: TodoListProps) {
  return (
    <div className="space-y-3">
      {todos.length === 0 ? (
        <div className="text-center py-12">
          <CheckCircle className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500 text-lg">
            No tasks. Add a new tasks.
          </p>
        </div>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            startEditing={startEditing}
            handleDeleteTodo={handleDeleteTodo}
          />
        ))
      )}
    </div>
  )
}
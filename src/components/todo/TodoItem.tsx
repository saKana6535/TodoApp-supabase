import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface Todo {
  id: number;
  title: string;
  description?: string;
}

interface TodoItemProps {
  todo: Todo;
  startEditing: (todo: Todo) => void;
  handleDeleteTodo: (id: number) => void;
}

export default function TodoItem({ todo, startEditing, handleDeleteTodo }: TodoItemProps) {
  return (
    <div 
    className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-100 border border-gray-100  cursor-pointer hover:bg-gray-100"
    onClick={() => startEditing(todo)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg text-gray-800 font-medium">
            {todo.title}
          </h3>
        </div>
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteTodo(todo.id)
          }}
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 ml-4"
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  )
}
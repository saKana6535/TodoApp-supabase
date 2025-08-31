import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface TodoFormProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  descriptionValue: string;
  setdescriptionValue: (value: string) => void;
  handleAddTodo: () => void;
}

export default function TodoForm({ inputValue, setInputValue, descriptionValue, setdescriptionValue, handleAddTodo }: TodoFormProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="space-y-4">
        {/* タイトル入力 */}
        <Input 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Add a new todo..."
          className="text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-200"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTodo();
            }
          }}
        />
        {/* 説明入力 */}
        <Input 
          value={descriptionValue} 
          onChange={(e) => setdescriptionValue(e.target.value)} 
          placeholder="Description(optional)"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTodo();
            }
          }}
        />
        {/* Addボタン */}
        <Button 
          onClick={handleAddTodo}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Add
        </Button>
      </div>
    </div>
  );
}
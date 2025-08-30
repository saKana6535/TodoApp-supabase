'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { getAllTodos, addTodo, deleteTodo, updateTodo } from "@/lib/supabaseFunction";
import { useState, useEffect } from "react";
import { Trash2, Plus, CheckCircle } from "lucide-react";

interface Todo {
  id: number;
  title: string;
  description?: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // タスク新規追加用の状態
  const [inputValue, setInputValue] = useState("");
  const [descriptionValue, setdescriptionValue] = useState("");

  // タスク編集用の状態
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await getAllTodos();
        setTodos(todos || []);
      } catch (error) {
        console.error(error);
      }
    }
    getTodos();
  }, []);

  const handleAddTodo = async () => {
    if (inputValue.trim() === "") return;
    try {
      await addTodo(inputValue, descriptionValue);
      setInputValue("");
      setdescriptionValue("");
      const updatedTodos = await getAllTodos();
      setTodos(updatedTodos || []);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      const updatedTodos = await getAllTodos();
      setTodos(updatedTodos || []);
    } catch (error) {
      console.error(error);
    }
  }

  const startEditing = (todo: Todo) => {
    setIsEditModalOpen(true);
    setEditingTodo(todo);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
  }

  const saveEdit = async () => {
    if (!editingTodo || editTitle.trim() === "") return;

    try {
      await updateTodo(editingTodo.id, editTitle, editDescription);
      const updateTodos = await getAllTodos();
      setTodos(updateTodos || []);
      closeEditModal();
    } catch (error) {
      console.error(error);
    }
  }
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTodo(null);
    setEditTitle("");
    setEditDescription("");
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <h1 className="text-center mb-8 text-4xl font-bold text-gray-800 mb-2">
          ✨ Todo App
        </h1>

        {/* 入力フォーム */}
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

        {/* Todoリスト */}
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
              <div 
                key={todo.id} 
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
            ))
          )}
        </div>

        {/* 統計情報 */}
        {todos.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Total: <span className="font-semibold text-blue-600">{todos.length}</span> tasks
            </p>
          </div>
        )}
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <Input 
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    saveEdit();
                  }
                }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Input 
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="(optional)"
                className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    saveEdit();
                  }
                }}
              />
            </div>
            
            {/* 保存・キャンセルボタン */}
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={closeEditModal}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={saveEdit}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
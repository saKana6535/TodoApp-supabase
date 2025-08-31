'use client'

import { getAllTodos, addTodo, deleteTodo, updateTodo } from "@/lib/supabaseFunction";
import { useState, useEffect } from "react";
import TodoForm from "@/components/todo/TodoForm";
import TodoList from "@/components/todo/TodoList";
import TodoEditModal from "@/components/todo/TodoEditModal";
import TodoStatus from "@/components/todo/TodoStatus";
import Header from "@/components/common/Header";
import { Todo } from "@/types/todo.types";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // タスク新規追加用の状態
  const [inputValue, setInputValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

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
      setDescriptionValue("");
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
        <Header />

        <TodoForm
          inputValue={inputValue}
          setInputValue={setInputValue}
          descriptionValue={descriptionValue}
          setDescriptionValue={setDescriptionValue}
          handleAddTodo={handleAddTodo}
        />

        <TodoList
          todos={todos}
          startEditing={startEditing}
          handleDeleteTodo={handleDeleteTodo}
        />

        <TodoStatus totalTodos={todos.length} />
      </div>

      <TodoEditModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        saveEdit={saveEdit}
        closeEditModal={closeEditModal}
      />
    </div>
  );
}
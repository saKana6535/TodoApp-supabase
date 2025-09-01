"use client";

import { Todo } from "@/types/todo.types";
import { useState, useEffect } from "react";
import { addTodo, deleteTodo, getAllTodos, updateTodo } from "@/lib/api/supabaseFunction";


export default function useTodos() {
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

  return {
    // 状態
    todos,
    inputValue,
    descriptionValue,
    editTitle,
    editDescription,
    isEditModalOpen,
    
    // setter関数
    setInputValue,
    setDescriptionValue,
    setEditTitle,
    setEditDescription,
    setIsEditModalOpen,
    
    // ハンドラー関数
    handleAddTodo,
    handleDeleteTodo,
    startEditing,
    saveEdit,
    closeEditModal
  };
}
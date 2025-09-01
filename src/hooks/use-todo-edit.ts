import { useState } from "react";
import { Todo } from "@/types/todo.types";

export function useTodoEdit() {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const startEditing = (todo: Todo) => {
    setIsEditModalOpen(true);
    setEditingTodo(todo);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTodo(null);
    setEditTitle("");
    setEditDescription("");
  };

  return {
    editingTodo,
    editTitle,
    editDescription,
    isEditModalOpen,
    setEditTitle,
    setEditDescription,
    setIsEditModalOpen,
    startEditing,
    closeEditModal
  };
}

"use client";

import TodoForm from "@/components/todo/TodoForm";
import TodoList from "@/components/todo/TodoList";
import TodoEditModal from "@/components/todo/TodoEditModal";
import TodoStatus from "@/components/todo/TodoStatus";
import Header from "@/components/common/Header";
import { useTodos } from "@/hooks/use-todos";
import { useTodoEdit } from "@/hooks/use-todo-edit";

export default function Home() {
  const { todos, handleAddTodo, handleDeleteTodo, handleUpdateTodo } = useTodos();
  
  const {
    editingTodo,
    editTitle,
    editDescription,
    isEditModalOpen,
    setEditTitle,
    setEditDescription,
    setIsEditModalOpen,
    startEditing,
    closeEditModal
  } = useTodoEdit();

  const saveEdit = async () => {
    if (!editingTodo || editTitle.trim() === "") return;
    
    // descriptionが空文字の場合はundefinedを渡す
    const description = editDescription.trim() || undefined;
    await handleUpdateTodo(editingTodo.id, editTitle.trim(), description);
    closeEditModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Header />

        <TodoForm onAddTodo={handleAddTodo} />

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
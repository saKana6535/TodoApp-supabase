"use client";

import TodoForm from "@/components/todo/TodoForm";
import TodoList from "@/components/todo/TodoList";
import TodoEditModal from "@/components/todo/TodoEditModal";
import TodoStatus from "@/components/todo/TodoStatus";
import Header from "@/components/common/Header";
import useTodos from "@/hooks/use-todos";

export default function Home() {
  const {
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
  } = useTodos();
  
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
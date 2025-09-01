import { Todo } from "@/types/todo.types";
import { useState, useEffect, useCallback } from "react";
import { addTodo, deleteTodo, getAllTodos, updateTodo } from "@/lib/api/supabaseFunction";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // 初期データ取得
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

  // Todo追加処理
  const handleAddTodo = useCallback(async (title: string, description?: string) => {
    if (title.trim() === "") return;
    try {
      // descriptionが空文字の場合はundefinedにする
      const descToSend = description?.trim() || undefined;
      await addTodo(title, descToSend);
      const updatedTodos = await getAllTodos();
      setTodos(updatedTodos || []);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Todo削除処理
  const handleDeleteTodo = useCallback(async (id: number) => {
    try {
      await deleteTodo(id);
      const updatedTodos = await getAllTodos();
      setTodos(updatedTodos || []);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Todo更新処理
  const handleUpdateTodo = useCallback(async (id: number, title: string, description?: string) => {
    if (title.trim() === "") return;
    try {
      // descriptionが空文字の場合はundefinedにする
      const descToSend = description?.trim() || undefined;
      await updateTodo(id, title, descToSend);
      const updatedTodos = await getAllTodos();
      setTodos(updatedTodos || []);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return {
    todos,
    handleAddTodo,
    handleDeleteTodo,
    handleUpdateTodo
  };
}
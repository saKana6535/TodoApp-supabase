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
    //楽観的更新
    const tempTodo: Todo = {
      id: -Date.now(), // 負の数で重複回避
      title: title.trim(),
      description: description?.trim() || undefined, // 統一した処理
    }
    setTodos(prev => [...prev, tempTodo]);

    try {
      // descriptionが空文字の場合はundefinedにする
      const descToSend = description?.trim() || undefined;
      await addTodo(title, descToSend);
      // 成功時は最新データで更新（他の操作と一貫性を保つ）
      const updatedTodos = await getAllTodos();
      setTodos(updatedTodos || []);
    } catch (error) {
      // エラー時は楽観的更新を元に戻す
      setTodos(prev => prev.filter(todo => todo.id !== tempTodo.id));
      console.error(error);
    }
  }, []);

  // Todo削除処理
  const handleDeleteTodo = useCallback(async (id: number) => {
    //楽観的更新
    const prevTodos = todos;
    setTodos(prev => prev.filter(todo => todo.id !== id));

    try {
      await deleteTodo(id);
    } catch (error) {
      // エラー時は楽観的更新を元に戻す
      setTodos(prevTodos);
      console.error(error);
    }
  }, [todos]);

  // Todo更新処理
  const handleUpdateTodo = useCallback(async (id: number, title: string, description?: string) => {
    if (title.trim() === "") return;

    //楽観的更新
    const prevTodos = todos;
    setTodos(prev => prev.map(todo => 
      todo.id === id ? {...todo, title: title.trim(), description: description?.trim() || undefined} : todo
    ));

    try {
      // descriptionが空文字の場合はundefinedにする
      const descToSend = description?.trim() || undefined;
      await updateTodo(id, title, descToSend);
    } catch (error) {
      setTodos(prevTodos);
      console.error(error);
    }
  }, [todos]);

  return {
    todos,
    handleAddTodo,
    handleDeleteTodo,
    handleUpdateTodo
  };
}
import { supabase } from "@/utils/supabase"
import { Todo, todoFromDatabase } from "@/types/todo.types"

export const getAllTodos = async (): Promise<Todo[]> => {
  const { data, error } = await supabase.from("todo-app").select("*");
  if (error) throw error;
  return data ? data.map(todoFromDatabase) : [];
}

export const addTodo = async (title: string, description?: string): Promise<void> => {
  const { error } = await supabase.from("todo-app").insert({
    title, 
    description: description || null
  });
  if (error) throw error;
}

export const deleteTodo = async (id: number): Promise<void> => {
  const { error } = await supabase.from("todo-app").delete().eq("id", id);
  if (error) throw error;
}

export const updateTodo = async (id: number, title: string, description?: string): Promise<void> => {
  const { error } = await supabase
    .from("todo-app")
    .update({
      title,
      description: description || null
    })
    .eq("id", id); 

  if (error) throw error;
}
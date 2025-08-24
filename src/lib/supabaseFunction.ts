import { supabase } from "@/utils/supabase"

export const getAllTodos = async () => {
  const todos = await supabase.from("todo-app").select("*");
  return todos.data;
}

export const addTodo = async (title: string, description?: string) => {
  if (description) {
    await supabase.from("todo-app").insert({title, description});
  }
  else {
    await supabase.from("todo-app").insert({title});
  }
}

export const deleteTodo = async (id: number) => {
  const { error } = await supabase.from("todo-app").delete().eq("id", id);
  if (error) {
    console.error(error);
  }
  return error;
}
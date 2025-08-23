import { supabase } from "@/utils/supabase"

export const getAllTodos = async () => {
  const todos = await supabase.from("todo-app").select("*");
  return todos.data;
}

export const addTodo = async (title: string) => {
  const { error } = await supabase.from("todo-app").insert({title});
  if (error) {
    console.error(error);
  }
  return error;
}
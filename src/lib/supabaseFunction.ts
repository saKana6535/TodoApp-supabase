import { supabase } from "@/utils/supabase"

export const getAllTodos = async () => {
  const todos = await supabase.from("todo-app").select("*");
  return todos.data;
}

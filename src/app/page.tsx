'use client'

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input"
import { getAllTodos } from "@/lib/supabaseFunction";
import { useState, useEffect } from "react";

interface Todo {
  id: number;
  title: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos= await getAllTodos();
        setTodos(todos || []);
      } catch (error) {
        console.error(error);
      }
    }
    getTodos();
  }, []);
  
  return (
    
    <section className="text-center">
      <h3>Supabase Todo App</h3>
      <Input />
      <Button>Add</Button>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h4>{todo.title}</h4>
        </div>
      ))}
    </section>
  );
}
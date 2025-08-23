'use client'

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input"
import { getAllTodos, addTodo } from "@/lib/supabaseFunction";
import { useState, useEffect } from "react";

interface Todo {
  id: number;
  title: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

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

  const handleAddTodo = async () => {
    if (inputValue.trim() === "") return;
    try {
      await addTodo(inputValue);
      setInputValue("");
      const updatedTodos = await getAllTodos();
      setTodos(updatedTodos || []);
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <section className="text-center">
      <h3>Supabase Todo App</h3>
      <Input 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Add a new todo"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddTodo();
          }
        }}
        />
      <Button onClick={handleAddTodo}>Add</Button>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h4>{todo.title}</h4>
        </div>
      ))}
    </section>
  );
}
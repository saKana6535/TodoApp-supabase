import { Database } from './database.types'

// データベーステーブルから型を抽出
type TodoRow = Database['public']['Tables']['todo-app']['Row']

export interface Todo {
  id: number
  title: string
  description?: string
}

// データベース行からアプリケーション型への変換関数
export function todoFromDatabase(dbTodo: TodoRow): Todo {
  return {
    id: dbTodo.id,
    title: dbTodo.title,
    description: dbTodo.description || undefined // nullの場合はundefined
  }
}

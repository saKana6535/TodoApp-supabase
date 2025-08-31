interface TodoStatusProps {
  totalTodos: number;
}

export default function TodoStatus({ totalTodos }: TodoStatusProps) {
  if (totalTodos === 0) return null;
  
  return (
    <div className="mt-8 text-center">
      <p className="text-gray-600">
        Total: <span className="font-semibold text-blue-600">{totalTodos}</span> tasks
      </p>
    </div>
  )
}
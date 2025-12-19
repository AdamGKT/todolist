import { Todo, TodosResponse } from 'src/types/todo';

const BASE_URL = 'https://dummyjson.com';

export const fetchTodos = async (): Promise<TodosResponse> => {
  const res = await fetch(`${BASE_URL}/todos`);
  if (!res.ok) throw new Error(`Failed to fetch todos ${res.status}`);
  return res.json();
};

export const addTodo = async (newTodo: string): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/todos/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: Date.now(),
      todo: newTodo,
      completed: false,
      userId: 1,
    }),
  });
  if (!res.ok) throw new Error(`AddTodo failed: ${res.status}`);

  return res.json();
};

export const updateTodo = async (id: number, updates: Partial<Todo>): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error(`Failed to update todo ${res.status}`);
  return res.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Failed to delete todo ${res.status}`);
};

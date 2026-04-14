import { useState, useEffect, useCallback } from 'react';

export type Priority = 'low' | 'medium' | 'high';
export type Category = 'personal' | 'work' | 'shopping' | 'health';
export type FilterStatus = 'all' | 'active' | 'completed';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  createdAt: number;
}

const STORAGE_KEY = 'taskflow-todos';

function loadTodos(): Todo[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : getDefaultTodos();
  } catch {
    return getDefaultTodos();
  }
}

function getDefaultTodos(): Todo[] {
  return [
    { id: '1', text: 'Review quarterly report', completed: false, priority: 'high', category: 'work', createdAt: Date.now() - 86400000 },
    { id: '2', text: 'Buy groceries for the week', completed: false, priority: 'medium', category: 'shopping', createdAt: Date.now() - 72000000 },
    { id: '3', text: 'Morning yoga session', completed: true, priority: 'low', category: 'health', createdAt: Date.now() - 50000000 },
    { id: '4', text: 'Call dentist for appointment', completed: false, priority: 'medium', category: 'personal', createdAt: Date.now() - 36000000 },
    { id: '5', text: 'Prepare presentation slides', completed: false, priority: 'high', category: 'work', createdAt: Date.now() - 20000000 },
    { id: '6', text: 'Pick up dry cleaning', completed: true, priority: 'low', category: 'personal', createdAt: Date.now() - 10000000 },
  ];
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text: string, priority: Priority, category: Category) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      priority,
      category,
      createdAt: Date.now(),
    };
    setTodos(prev => [newTodo, ...prev]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(t => !t.completed));
  }, []);

  const filteredTodos = todos.filter(todo => {
    const statusMatch = filter === 'all' || (filter === 'active' && !todo.completed) || (filter === 'completed' && todo.completed);
    const categoryMatch = categoryFilter === 'all' || todo.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  };

  return {
    todos: filteredTodos,
    allTodos: todos,
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    stats,
  };
}

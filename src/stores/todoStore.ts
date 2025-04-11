import { create } from 'zustand';
import { TodoItem } from '@/types';

interface TodoStore {
  todos: TodoItem[];
  currentTask: TodoItem | null;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setCurrentTask: (id: string) => void;
  clearCurrentTask: () => void;
  clearCompletedTodos: () => void;
}

const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  currentTask: null,

  addTodo: (text) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: Date.now().toString(),
          text,
          completed: false,
          isCurrentTask: false,
        },
      ],
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
      currentTask: state.currentTask?.id === id ? null : state.currentTask,
    })),

  setCurrentTask: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) => ({
        ...todo,
        isCurrentTask: todo.id === id,
      })),
      currentTask: state.todos.find((todo) => todo.id === id) || null,
    })),

  clearCurrentTask: () =>
    set((state) => ({
      todos: state.todos.map((todo) => ({
        ...todo,
        isCurrentTask: false,
      })),
      currentTask: null,
    })),

  clearCompletedTodos: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    })),
}));

export default useTodoStore; 
import React, { useState } from 'react';
import {
  CheckIcon,
  TrashIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import * as Dialog from '@radix-ui/react-dialog';
import useTodoStore from '@/stores/todoStore';

const TodoList: React.FC = () => {
  const {
    todos,
    currentTask,
    addTodo,
    toggleTodo,
    deleteTodo,
    setCurrentTask,
    clearCurrentTask,
    clearCompletedTodos,
  } = useTodoStore();

  const [newTodo, setNewTodo] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">
          {currentTask ? currentTask.text : 'No current task'}
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-1 rounded-full hover:bg-gray-800"
        >
          <EllipsisHorizontalIcon className="w-6 h-6" />
        </button>
      </div>

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto space-y-6">
            <Dialog.Title className="text-lg font-semibold">Todo List</Dialog.Title>

            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-3 py-2 bg-white/5 rounded"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white/10 rounded hover:bg-white/20"
              >
                Add
              </button>
            </form>

            <div className="space-y-4">
              {incompleteTodos.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Tasks</h3>
                  {incompleteTodos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex items-center justify-between p-2 bg-white/5 rounded group"
                    >
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleTodo(todo.id)}
                          className="w-5 h-5 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10"
                        >
                          {todo.completed && (
                            <CheckIcon className="w-4 h-4 text-white" />
                          )}
                        </button>
                        <span className={todo.completed ? 'line-through opacity-50' : ''}>
                          {todo.text}
                        </span>
                      </div>
                      <div className="space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!todo.isCurrentTask && (
                          <button
                            onClick={() => setCurrentTask(todo.id)}
                            className="px-2 py-1 text-sm bg-white/10 rounded hover:bg-white/20"
                          >
                            Set Current
                          </button>
                        )}
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {completedTodos.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Completed</h3>
                    <button
                      onClick={clearCompletedTodos}
                      className="text-sm text-white/50 hover:text-white/70"
                    >
                      Clear all
                    </button>
                  </div>
                  {completedTodos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex items-center justify-between p-2 bg-white/5 rounded group"
                    >
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleTodo(todo.id)}
                          className="w-5 h-5 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10"
                        >
                          <CheckIcon className="w-4 h-4 text-white" />
                        </button>
                        <span className="line-through opacity-50">{todo.text}</span>
                      </div>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default TodoList; 
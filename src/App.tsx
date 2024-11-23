import React, { useState } from 'react';
import { PlusCircle, CheckCircle2 } from 'lucide-react';
import { TodoItem } from './components/TodoItem';
import { useTodos } from './hooks/useTodos';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Get Things Done
          </h1>
          <p className="text-gray-600">
            Stay organized and productive with your personal task manager
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-200 flex items-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              Add Task
            </button>
          </div>
        </form>

        <div className="space-y-6">
          {activeTodos.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Active Tasks ({activeTodos.length})
              </h2>
              <div className="space-y-2">
                {activeTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                  />
                ))}
              </div>
            </section>
          )}

          {completedTodos.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Completed ({completedTodos.length})
              </h2>
              <div className="space-y-2 opacity-75">
                {completedTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                  />
                ))}
              </div>
            </section>
          )}

          {todos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No tasks yet. Add one to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
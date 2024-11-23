import React, { useState } from 'react';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSubmit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <div className="group flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-colors duration-200 flex items-center justify-center
          ${todo.completed ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 hover:border-emerald-500'}`}
      >
        {todo.completed && <Check className="w-4 h-4 text-white" />}
      </button>

      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 bg-gray-50 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            autoFocus
          />
          <button
            onClick={handleSubmit}
            className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
          >
            <Check className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="p-1 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <>
          <span className={`flex-1 ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
            {todo.text}
          </span>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
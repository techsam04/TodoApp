// src/components/Task.js
'use client'
import React from 'react';
import { TodoAppContext } from '../context/TodoAppContext'
import { useContext } from 'react'


function Task({ task }) {
  const { isCompleted, setIsCompleted, tasks, setTasks, editingTask, setEditingTask, deleteTask, updateTask } = useContext(TodoAppContext)

  return (
    <div
      key={task.id}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex items-center justify-between">
        {editingTask === task.id ? (
          <input
            type="text"
            defaultValue={task.description}
            onBlur={(e) => updateTask(task.id, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                updateTask(task.id, e.target.value)
              }
            }}
            onClick={(e) => updateTask(task.id, e.target.value)}
            className="flex-1 mr-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <span className="text-gray-700 text-lg">{task.description}</span>
        )}

        <div className="flex space-x-2">
          <button
            disabled={isCompleted}
            onClick={() => setEditingTask(task.id)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
          >
            Edit
          </button>
          <button
            disabled={isCompleted}
            onClick={() => deleteTask(task.id)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 disabled:opacity-50"
          >
            Delete
          </button>
          <button
            onClick={() => {updateTask(task.id, task.description, true); setIsCompleted(true)}}
            className={`px-4 py-2 ${task.completed
                ? 'bg-green-600 hover:bg-green-700 '
                : 'bg-gray-500 hover:bg-gray-600'
              } text-white rounded transition-colors duration-200`}
          >
            {task.completed ? 'Completed' : 'Mark as Completed'}
          </button>

        </div>
      </div>
    </div>)

}

export default Task;
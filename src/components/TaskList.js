'use client'
import React from 'react';
import { useTodoApp } from '../context/TodoAppContext'
import Task from '@/components/Task'


export default function TaskList() {


  const { tasks, setTasks, editingTask, setEditingTask, loading, setLoading, error, setError } = useTodoApp()
    


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        My Tasks
      </h1>
      <div className="space-y-4">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}

        {tasks.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No tasks found. Add some tasks to get started!
          </div>
        )}
      </div>

    </div>
  )
}


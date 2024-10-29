'use client'
import { createContext, useState, useEffect, useContext } from 'react'

export const TodoAppContext = createContext(null) 


function TodoAppProvider({ children }) {
    
  const [tasks, setTasks] = useState([1,2,3,4,5])
  const [editingTask, setEditingTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [isCompleted, setIsCompleted] = useState(false)

  const [description, setDescription] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringType, setRecurringType] = useState('none');
  const [frequency, setFrequency] = useState(1);
  const [selectedDays, setSelectedDays] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [nthDay, setNthDay] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks')
      if (!response.ok) throw new Error('Failed to fetch tasks')
      const data = await response.json()
      console.log(data);
      setTasks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete task')
      setTasks(tasks.filter(task => task.id !== id))
    } catch (err) {
      console.error('Error deleting task:', err)
    }
  }

  const updateTask = async (id, newText, completedStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: newText, completed: completedStatus }),
      })
      if (!response.ok) throw new Error('Failed to update task')

      const updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, description: newText, completed: completedStatus } : task
      )
      setTasks(updatedTasks)
      setEditingTask(null)
    } catch (err) {
      console.error('Error updating task:', err)
    }
  }

  const addTask = async (taskData) => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      })

      if (!response.ok) throw new Error('Failed to add task')
      
      const newTask = await response.json()
      setTasks([...tasks, newTask])
      return newTask
    } catch (err) {
      console.error('Error adding task:', err)
      throw err
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const taskData = {
        description,
        recurring: isRecurring ? {
          type: recurringType,
          frequency,
          selectedDays,
          startDate,
          endDate: endDate || null,
          nthDay: nthDay || null
        } : null
      };

      // const response = await fetch('http://localhost:5000/api/tasks', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(taskData),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to add task');
      // }

      // const data = await response.json();
      // console.log('Task added successfully:', data);
      addTask(taskData)
      // Clear the form
      
      setDescription('');
      setIsRecurring(false)
      setRecurringType('none')
      setFrequency(1)
      setSelectedDays([])
      setStartDate('')
      setEndDate('')
      setNthDay('')
      // Optionally add success notification here
      alert('Task added successfully!');
      
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task. Please try again.');
    }
  };

  return (
    <TodoAppContext.Provider value={{
        tasks,
        loading,
        error,
        editingTask,
        setEditingTask,
        deleteTask,
        updateTask,
        addTask, 
        handleSubmit,
        description,
        setDescription,
        isRecurring,
        setIsRecurring,
        recurringType, setRecurringType, frequency, setFrequency, selectedDays, setSelectedDays, startDate, setStartDate, endDate, setEndDate,
        isCompleted, setIsCompleted
      }}>
      {children}
    </TodoAppContext.Provider>
  )
}
export const useTodoApp = () => {
    const context = useContext(TodoAppContext)
    if (!context) {
      throw new Error('useTodoApp must be used within a TodoAppProvider')
    }

    return context
  }

export default TodoAppProvider



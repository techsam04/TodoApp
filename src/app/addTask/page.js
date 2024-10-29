'use client';
import React from 'react';
import { useState } from 'react';
import { useTodoApp } from '@/context/TodoAppContext';
import DatePicker from '@/components/DatePicker';
function AddTask() {


  const { handleSubmit, description, setDescription, isRecurring, setIsRecurring, recurringType, setRecurringType, frequency, setFrequency, selectedDays, setSelectedDays, startDate, setStartDate, endDate, setEndDate } = useTodoApp()
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];



  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add New Task</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 mb-2">
            Save your task here !
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-lg"
            rows="3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="mr-2"
            />
            Make this a recurring task
          </label>
        </div>

        {isRecurring && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Recurring Type</label>
              <select
                value={recurringType}
                onChange={(e) => setRecurringType(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="none">Select Type</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            {recurringType !== 'none' && (
              <>
                <div>
                  <label className="block text-gray-700 mb-2">Frequency</label>
                  <input
                    type="number"
                    min="1"
                    value={frequency}
                    onChange={(e) => setFrequency(parseInt(e.target.value))}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                {recurringType === 'weekly' && (
                  <div>
                    <label className="block text-gray-700 mb-2">Select Days</label>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                      <label key={day} className="inline-flex items-center mr-4">
                        <input
                          type="checkbox"
                          checked={selectedDays.includes(index)}
                          onChange={(e) => {
                            setSelectedDays(e.target.checked 
                              ? [...selectedDays, index]
                              : selectedDays.filter(d => d !== index)
                            );
                          }}
                          className="mr-1"
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                )}

                <DatePicker name="Start Date" min={today} />
                <DatePicker name="End Date" min={startDate || today} />
               
              </>
            )}
          </div>
        )}

        <button
          type="submit"
          className="mt-10 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;

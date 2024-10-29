'use client'
import React from 'react';
import { useState } from 'react'
import { useTodoApp } from '@/context/TodoAppContext'

export default function DataPicker({name, min}) {


  const { startDate, setStartDate } = useTodoApp()
  const today = new Date().toISOString().split('T')[0];
  return (
    <div>
                  <label className="block text-gray-700 mb-2">{name}</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={min}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
  )
}


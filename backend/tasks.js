
const express = require('express');
const router = express.Router();
const pool = require('./db');


router.post('/api/tasks', async (req, res) => {
  try {
    const { description } = req.body;
    
    const query = `
      INSERT INTO tasks (description)
      VALUES ($1)
      RETURNING *
    `;
    
    const values = [description];
    const result = await pool.query(query, values);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Error adding task' });
  }
});



router.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tasks ORDER BY created_at DESC'
    )
    res.status(200).json(result.rows)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({ message: 'Error fetching tasks' })
  }
});


router.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {  description, completed } = req.body;
    
    const result = await pool.query(
      ' UPDATE tasks SET description = $1, completed = $2 WHERE id = $3 RETURNING *;',
      [description, completed, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Error updating task' });
  }
});


router.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Error deleting task' });
  }
});

module.exports = router
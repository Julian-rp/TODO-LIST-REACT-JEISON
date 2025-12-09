import express from 'express';
import { db } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all tasks
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [tasks] = await db.execute(
      'SELECT * FROM tasks ORDER BY created_at DESC'
    );
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// Get task by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const [tasks] = await db.execute(
      'SELECT * FROM tasks WHERE id = ?',
      [id]
    );

    if (tasks.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(tasks[0]);
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Error fetching task' });
  }
});

// Create task
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user.userId;
    const username = req.user.username;

    if (!text) {
      return res.status(400).json({ error: 'Task text is required' });
    }

    const [result] = await db.execute(
      'INSERT INTO tasks (text, author, completed, editor) VALUES (?, ?, ?, ?)',
      [text, username, false, null]
    );

    const [newTask] = await db.execute(
      'SELECT * FROM tasks WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(newTask[0]);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Error creating task' });
  }
});

// Update task
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;
    const username = req.user.username;

    const [tasks] = await db.execute(
      'SELECT * FROM tasks WHERE id = ?',
      [id]
    );

    if (tasks.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updateFields = [];
    const updateValues = [];

    if (text !== undefined) {
      updateFields.push('text = ?');
      updateValues.push(text);
      updateFields.push('editor = ?');
      updateValues.push(username);
    }

    if (completed !== undefined) {
      updateFields.push('completed = ?');
      updateValues.push(completed);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updateValues.push(id);

    await db.execute(
      `UPDATE tasks SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    const [updatedTask] = await db.execute(
      'SELECT * FROM tasks WHERE id = ?',
      [id]
    );

    res.json(updatedTask[0]);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Error updating task' });
  }
});

// Delete task
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const [tasks] = await db.execute(
      'SELECT * FROM tasks WHERE id = ?',
      [id]
    );

    if (tasks.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await db.execute('DELETE FROM tasks WHERE id = ?', [id]);

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Error deleting task' });
  }
});

export default router;


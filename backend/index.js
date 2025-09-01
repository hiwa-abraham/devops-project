require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 4000;

// PostgreSQL connection pool
const pool = new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD
});

// Middleware
app.use(cors());
app.use(express.json());

// Root route (optional)
app.get('/', (req, res) => {
    res.json({ message: "API is running!" });
});

// ========== CRUD Endpoints for 'tasks' ==========

// Get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks ORDER BY id');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks.' });
    }
});

// Get a single task by id
app.get('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch task.' });
    }
});

// Create a new task
app.post('/tasks', async (req, res) => {
    try {
        const { title, completed = false } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Title is required.' });
        }
        const result = await pool.query(
            'INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *',
            [title, completed]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task.' });
    }
});

// Update a task by id
app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        // Optionally, check if task exists
        const findTask = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
        if (findTask.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found.' });
        }
        const result = await pool.query(
            'UPDATE tasks SET title=$1, completed=$2 WHERE id=$3 RETURNING *',
            [title ?? findTask.rows[0].title, typeof completed === 'boolean' ? completed : findTask.rows[0].completed, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task.' });
    }
});

// Delete a task by id
app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM tasks WHERE id=$1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found.' });
        }
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task.' });
    }
});

// --- Start server only if not in test (for Supertest/Jest compatibility) ---
if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; // so tests can import the app
module.exports.pool = pool; // add this!
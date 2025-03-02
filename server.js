const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection (adjust credentials)
const pool = new Pool({
  user: 'postgres', // Your PostgreSQL username
  host: 'quiver.cb0wgkyemi3y.eu-north-1.rds.amazonaws.com', // AWS RDS endpoint
  database: 'QuiverDB', // Database name
  password: 'Simsonroot_1', // Your password
  port: 5432, // Default PostgreSQL port
});

// JWT Secret
const jwtSecret = 'your_jwt_secret_key'; // Use an env variable for production

// Signup Route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }
  
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const newUser = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );
  
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error('Error during signup:', err.message);
        res.status(500).json({ error: 'An error occurred during signup' });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.rows[0].id }, jwtSecret, { expiresIn: '1h' });
        res.json({ token, userId: user.rows[0].id });
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Middleware to check JWT and retrieve current user
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user; // Save the user info to the request object
        next();
    });
};

// Get Current User Route
app.get('/api/currentUser', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId; // Get the user ID from the JWT payload
        const user = await pool.query('SELECT id FROM users WHERE id = $1', [userId]); // Fetch the user from the database
        
        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        res.json({ id: user.rows[0].id });
    } catch (error) {
        console.error('Error fetching current user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Passwords Routes
app.post('/api/passwords', async (req, res) => {
    const { userId, name, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO passwords (user_id, name, password) VALUES ($1, $2, $3) RETURNING *',
            [userId, name, password]
        );
        res.status(201).json(result.rows[0]); // Return the created password object
    } catch (error) {
        console.error('Error adding password:', error);
        res.status(500).json({ error: 'Error adding password' });
    }
});

app.get('/api/passwords', async (req, res) => {
    const { userId } = req.query;
    try {
        const result = await pool.query('SELECT * FROM passwords WHERE user_id = $1', [userId]);
        res.status(200).json(result.rows); // Return the list of passwords for the user
    } catch (error) {
        console.error('Error fetching passwords:', error);
        res.status(500).json({ error: 'Error fetching passwords' });
    }
});

app.delete('/api/passwords/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM passwords WHERE id = $1', [id]);
        res.status(200).json({ message: 'Password deleted successfully' });
    } catch (error) {
        console.error('Error deleting password:', error);
        res.status(500).json({ error: 'Error deleting password' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

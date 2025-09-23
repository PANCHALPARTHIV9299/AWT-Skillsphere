import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectToDatabase } from './config/db.js';

import seminarRoutes from './routes/seminar.routes.js';
import registrationRoutes from './routes/registration.routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// View engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Session
const sessionSecret = process.env.SESSION_SECRET || 'dev_secret_change_me';
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);

// MongoDB connection
connectToDatabase()
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Skillsphere Backend' });
});

app.use('/api/seminars', seminarRoutes);
app.use('/api/registrations', registrationRoutes);

// Fallback
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const pageRoutes = require('./routes/pages');
const authRoutes = require('./routes/authRoutes');
const caseRoutes = require('./routes/caseRoutes');
const evidenceRoutes = require('./routes/evidenceRoutes');
const userRoutes = require('./routes/userRoutes');
const logRoutes = require('./routes/logRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.locals.user = req.user || null; 
  next();
});

app.use('/', pageRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/evidence', evidenceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/logs', logRoutes);

app.use((req, res) => res.status(404).render('error', { message: 'Page Not Found' }));


module.exports = app;




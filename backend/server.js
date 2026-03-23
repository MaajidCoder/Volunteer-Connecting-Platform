const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const auth = require('./routes/auth');
const events = require('./routes/events');
const applications = require('./routes/applications');
require('dotenv').config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Mount routers
app.use('/api/auth', auth);
app.use('/api/events', events);
app.use('/api/applications', applications);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

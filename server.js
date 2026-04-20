require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',     require('./routes/auth'));
app.use('/api/events',   require('./routes/events'));
app.use('/api/tasks',    require('./routes/tasks'));
app.use('/api/messages', require('./routes/messages'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
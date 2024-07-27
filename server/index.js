require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');
const app = express();
const PORT = process.env.PORT;
const MONGOURI = process.env.MONGOURI;

mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

app.use(cors());
app.use(bodyParser.json());

app.use('/tasks', taskRoutes);

app.use(express.static('public'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client', 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
  })
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

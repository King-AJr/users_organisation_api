const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const { initializeDatabase } = require("./db/database");


const authRoutes = require('./routes/authRoutes');
const userInfoRoutes = require('./routes/userInfoRoutes');
const organisationsRoutes = require('./routes/organisationsRoutes');


dotenv.config();

const PORT = process.env.PORT || 3005;


initializeDatabase().then(() => {
    console.log("Connected to the database!");
  
    app.use(cors());
    app.use(bodyParser.json());
    app.use('/auth',authRoutes);
    app.use('/api/users',userInfoRoutes);
    app.use('/api', organisationsRoutes);



    app.use((req, res) => {
        res.status(404).json({ error: 'Ooops that endpoint does not exist' });
    });

   

  
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }).catch(error => console.log("Database connection error:", error));
  

module.exports = app;
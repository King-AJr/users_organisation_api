const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/authRoutes');
const userInfoRoutes = require('./routes/userInfoRoutes');
const organisationsRoutes = require('./routes/organisationsRoutes');


dotenv.config();

const port = process.env.PORT || 3005;

app.use(cors());
app.use(bodyParser.json());
app.use('/auth',userRoutes);
app.use('/api/users',userInfoRoutes);
app.use('/api', organisationsRoutes);



app.use((req, res) => {
    res.status(404).json({ error: 'Ooops that endpoint does not exist' });
});

    app.listen(port,()=> console.log(`Database connected successfully and app listening on port ${port}`))
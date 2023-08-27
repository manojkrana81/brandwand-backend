const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const router = require('./routes/routes');
const adminRouter = require('./routes/adminRoutes');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:4200']
}));


// Connect to Database
async function connectToDatabase() {
    await mongoose.connect(process.env.MONGODB_URI);
}

connectToDatabase()
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hi there');
});

// Router Middleware
app.use('/', router);

// Admin Routes
app.use('/admin', adminRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

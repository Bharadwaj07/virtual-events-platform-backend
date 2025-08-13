require('dotenv').config();
const express = require('express');
const prisma = require('./clients/prisma');
const redis = require('./clients/redis');
const userRoutes = require('./routes/user');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/users', userRoutes);


Promise.all([
    prisma.$connect(),
    redis.connect()
])
.then(() => {
    console.log('Connected to Postgres and Redis');
    app.listen(port, () => {
        console.log(`Server is listening on ${port}`);
    });
})
.catch(err => {
    console.error('Error connecting to Postgres or Redis:', err);
    process.exit(1);
});

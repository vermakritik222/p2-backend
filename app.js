const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const universalMiddleware = require('./middlewares/universalMiddleware');
const productRouter = require('./routes/productRouter');
const authRouter = require('./routes/authRouter');
const oderRouter = require('./routes/oderRouter');

const app = express();

// JSON Parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// cors
const corsOption = {
    credentials: true,
    origin: ['http://localhost:3000'],
};

app.use(cors(corsOption));

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Middleware
app.use(universalMiddleware.sendTimeStamp);

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/oder', oderRouter);
app.use('/api/v1/restaurants', productRouter);

app.get('/', (req, res) => {
    res.send('hello');
});

app.all('*', (req, res, next) => {
    console.log('page not found');
});

module.exports = app;

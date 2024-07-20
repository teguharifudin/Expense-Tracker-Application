const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config();
require('./db');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const expenseRoutes = require("./routes/expense.routes");
app.use("/expense", expenseRoutes);

const categoryRoutes = require("./routes/category.routes");
app.use("/category", categoryRoutes);

const profileRoutes = require("./routes/profile.routes");
app.use('/profile', profileRoutes);

module.exports = app;
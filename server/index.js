require('dotenv').config();
const express = require('express')
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const path = require('path');
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { checkAuthentication } = require('./middlewares/authentication');
const Blog = require('./models/blog');
const cors = require("cors");


const app = express()
const port = process.env.PORT || 8001;

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});



app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuthentication());


app.get('/api', async (req, res) => {
  try {
    const allBlogs = await Blog.find({});
    res.json({user: req.user,
    blogs: allBlogs
  });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});



app.use('/user', userRoutes);

app.use('/blog', blogRoutes);



app.listen(port, () => console.log(`Server started at http://localhost:${port}/`))

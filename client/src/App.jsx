import { useState } from "react";
import { Login } from "./components/views/Login";
import { Signup } from "./components/views/Signup";
import { Nav } from "./components/views/Nav";
import { Home } from "./components/views/Home";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Blog } from "./components/views/Blog";
import { CreateBlog } from "./components/views/CreateBlog";
import { AdminBlogPage } from "./components/layouts/AdminBlogPage";
import { MyBlogs } from "./components/views/MyBlogs";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/blog/Introducing-Blogify" element={<AdminBlogPage />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/myblogs" element={<MyBlogs />} />
      </Routes>
    </Router>
  );
}

export default App;

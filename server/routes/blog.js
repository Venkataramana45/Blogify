const { Router } = require("express");
const Blog = require("../models/blog");
const Comment = require("../models/comments");
const User = require("../models/user");
const multer = require("multer");
const { checkAuthentication } = require("../middlewares/authentication");

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage });

router.get("/add", (req, res) => {
  return res.json({ user: req.user });
});

router.post("/", upload.single("image"), async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = await Blog.create({
      title,
      content,
      createdBy: req.user.id,
      coverImageURL: `/uploads/${req.file.filename}`,
    });
    return res.status(200).json(blog._id);
  } catch (error) {
    console.error("Error adding blog:", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/myblogs", async (req, res) => {
  const userId = req.user.id;
  try{
    const userBlogs = await Blog.find({createdBy: userId});
    return res.status(200).json(userBlogs);
  } catch {
    return res.status(404).json({error: "Unable to get user blogs"})
  }
});

router.get("/:id", async (req, res) => {
  const blogId = req.params.id;
  const comments = await Comment.find({ blog: blogId }).populate("createdBy");
  try {
    const blog = await Blog.findById(blogId).populate("createdBy");
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    const user = await User.findById(blog.createdBy);
    return res.status(200).json({ blog, user, comments });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.status(500).send("Internal Server Error");
  }
});


router.post("/comments/:id", async (req, res) => {
  const blogId = req.params.id;
  const { content } = req.body;
  try {
    const comment = await Comment.create({
      content,
      createdBy: req.user.id,
      blog: blogId,
    });
    const populated = await Comment.findById(comment._id).populate("createdBy");
    return res.status(201).json(populated);
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

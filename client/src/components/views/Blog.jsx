import React, { useState, useEffect } from "react";
import thumbnail from "../../assets/thumbnail.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import { YellowButton } from "../layouts/YellowButton";
import user from "../../assets/user.jpg";
import TextareaAutosize from 'react-textarea-autosize';

export const Blog = () => {
  const [blogData, setBlogData] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoginedIn, setLogingedIn] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:8001";
    axios.defaults.withCredentials = true;
    axios
      .get(`/blog/${id}`)
      .then((res) => {
        setBlogData(res.data.blog);
        setComments(res.data.comments);
        setHtmlContent(res.data.blog.content);
        setUserName(res.data.user ? res.data.user.fullName : "");
      })
      .catch((err) => console.error("Error fetching blog:", err));
    axios.get("http://localhost:8001/user/verify").then((response) => {
      if (response.data.loggedIn) {
        setLogingedIn(true);
      }
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (blogData.title) {
      document.title = `Blogify - ${blogData.title}`;
    }
  }, [blogData.title, id]);

  const handleClick = async (e) => {
    e.preventDefault();

    if (newComment.trim() === "") {
      return alert("Please enter a comment.");
    }

    try {
      axios.defaults.withCredentials = true;
      axios
        .post(`http://localhost:8001/blog/comments/${id}`, {
          content: newComment,
        })
        .then((res) => {
          const created = res.data;
          setComments((prev) => [created, ...prev]);
          setNewComment("");
        });
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to post comment. Please login.");
    }
  };

  return (
    <>
      <img
        src={
          blogData.coverImageURL
            ? `http://localhost:8001${blogData.coverImageURL}`
            : thumbnail
        }
        alt="thumbnail"
        className="w-full h-full object-cover pt-21 justify-self-center aspect-5/2"
      />
      <div className="flex flex-col min-h-screen max-w-screen mx-30 items-start pt-15 pb-15 space-y-3">
        <h1 className="text-4xl text-white/90 font-bold">{blogData.title}</h1>
        <div className="font-semibold text-white/60 text-xl"> - {userName}</div>
        <div className=" text-white/50 text-md">
          {" "}
          Last updated on {new Date(blogData.updatedAt).toLocaleDateString()}
        </div>
        <div className="para text-white/85 pt-10">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>

      <div className="mx-30 max-w-screen pb-20 space-y-6">
        <h2 className="text-2xl font-semibold">Comments - {comments.length}</h2>
        {isLoginedIn && (
          <form className="max-w-screen space-y-3" onSubmit={handleClick}>
            <TextareaAutosize
              className="border-2 w-full px-3 py-2 rounded-lg border-white/60 resize-none"
              minRows={3}
              required
              placeholder="Enter Comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <YellowButton type="submit" title="Post" />
          </form>
        )}

        {comments.map((comment) => (
          <div key={comment._id} className="space-y-2 py-3">
            <div className="flex gap-4">
              <img src={user} alt="user" className="w-7 h-7 rounded-full" />
              <p className="text-white/60 font-semibold text-lg">
                {comment.createdBy.fullName}
              </p>
            </div>
            <div className="w-full overflow-hidden">
              <pre className="text-white/90 ml-12 text-wrap text-justify">
                {comment.content}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

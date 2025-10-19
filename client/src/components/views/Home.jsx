import React from "react";
import {useNavigate } from "react-router-dom";
import thumbnail from "../../assets/thumbnail.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { AdminBlog } from "../layouts/AdminBlog";

export const Home = () => {
  const [HomeData, setHomeData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api")
      .then((res) => {
        setHomeData(res.data.blogs);
      })
      .catch((err) => console.error("Error fetching posts:", err));
      document.title = "Blogify"
  }, []);

  const handleClick = (id) => {
    navigate(`/blog/${id}`);
  }

  return (
    <div className="flex min-h-screen max-w-screen mx-30 items-start pt-35 flex-col gap-10 pb-20 overflow-x-hidden">
      {HomeData.length === 0 ? (
        <AdminBlog/>
      ) : (HomeData.map((post) => (
        <>
        <div
          onClick={() => handleClick(post._id)}
          className="bg-gray px-7 py-5 rounded-lg w-full pointer"
          key={post._id}
        >
          <div className="space-y-3 pointer">
            <h1 className="text-3xl text-white/90 font-bold">{post.title}</h1>
            <div className="flex gap-10 pt-5 items-center">
              <div className="aspect-square bg-black rounded-sm w-45 h-45">
                <img
                  src={post.coverImageURL ? `http://localhost:8001${post.coverImageURL}` : thumbnail}
                  alt="Thumbnail"
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="text-justify line-clamp-8 text-white/60 overflow-hidden text-ellipsis pointer text-wrap">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </div>
          </div>
        </div>
        </>
      ))
      )}
      <AdminBlog/>
    </div>
  );
};

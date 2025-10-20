import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import thumbnail from "../../assets/thumbnail.png";
import { useState, useEffect } from "react";

export const MyBlogs = () => {
  const [BlogData, setBlogData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:8001";
    axios.defaults.withCredentials = true;
    axios
      .get("/blog/myblogs")
      .then((res) => {
        setBlogData(res.data);
      })
      .catch((err) => console.error("Error fetching posts:", err));
    document.title = "Blogify - My Blogs";
  }, []);

  const handleClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="flex min-h-screen max-w-screen lg:mx-30 mx-10 items-start pt-35 flex-col gap-10 pb-20 overflow-x-hidden">
      <div className="lg:text-4xl text-3xl font-bold text-white/90 pb-4">My Blogs</div>
      {BlogData.length === 0 ? (
        <div className="text-2xl text-white/60 m-auto">No Blogs Found</div>
      ) : (
        BlogData.map((post) => (
          <>
            <div
              onClick={() => handleClick(post._id)}
              className="bg-gray px-7 py-5 rounded-lg w-full pointer"
              key={post._id}
            >
              <div className="lg:space-y-3 space-y-0.5 pointer">
                <h1 className="lg:text-3xl text-xl text-justify text-white/90 font-bold">
                  {post.title}
                </h1>
                <div className="flex gap-10 pt-5 items-center">
                  <div className="aspect-square bg-black rounded-sm w-45 h-45 md:block hidden">
                    <img
                      src={
                        post.coverImageURL
                          ? `http://localhost:8001${post.coverImageURL}`
                          : thumbnail
                      }
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
    </div>
  );
};

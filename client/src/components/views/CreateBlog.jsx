import React from "react";
import { useState } from "react";
import { YellowButton } from "../layouts/YellowButton";
import Editor, {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnUnderline,
  BtnUndo,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateBlog = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [html, setHtml] = useState("");
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  document.title = "Blogify - Create Blog"

  function onChange(e) {
    setHtml(e.target.value);
  }

  function ontitleChange(e) {
    setTitle(e.target.value);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !html || !imageFile) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = {
      title: title,
      content: html,
      image: imageFile
    };

    try {
      axios.defaults.baseURL = "http://localhost:8001";
      const response = await axios.post("/blog/", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const blogId = await response.data;
        navigate(`/blog/${blogId}`);
      } else {
        throw new Error("Failed to create blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Error creating blog. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col min-h-screen max-w-screen mx-30 pt-35 gap-10 pb-20 items-center"
    >
      <label className="w-full h-64 flex flex-col items-center justify-center border-2 border-white/40 border-dashed rounded-lg pointer">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Selected Preview"
            className="w-full h-full object-contain rounded-lg"
          />
        ) : (
          <div className="text-center">
            <p className="text-white/50">Click to upload an image</p>
            <p className="text-sm text-white/50">(JPG, JPEG, PNG)</p>
            <p className="text-sm text-white/50">
              Recommended aspect ratio is 5:1
            </p>
          </div>
        )}
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          className="hidden w-full h-full"
          onChange={handleImageChange}
          required={true}
        />
      </label>
      <div className="flex flex-col gap-3 w-full">
        <label className="text-white/70">Title *</label>
        <input
          type="text"
          required
          className="border-2 border-white/40 rounded-lg h-10 focus:border-amber px-5 py-5"
          placeholder="Enter your Title"
          onChange={ontitleChange}
        />
      </div>
      <div className="flex flex-col gap-3 w-full">
        <label className="text-white/70">Content *</label>
        <Editor
          value={html}
          onChange={onChange}
          placeholder="Enter your Content"
          required
          className="editor"
        >
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </div>
      <YellowButton type="submit" title="Upload" />
    </form>
  );
};

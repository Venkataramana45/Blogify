import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Link} from 'react-router-dom';

export const DropDownMenu = (props) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("pressed");
    try {
      console.log("started");
      await axios.get("http://localhost:8001/user/logout",{ withCredentials: true });
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex flex-col dropdown">
      <ul className="flex flex-col gap-2 justify-center items-center">
        <li className="font-semibold text-lg">{props.name}</li>
        <li className="text-sm text-gray/80">{props.email}</li>
        <hr className="border-1 border-gray/40 w-full -px-30" />
        <Link to= "/myblogs"><li className="pointer text-black/70 hover:underline hover:text-black">My Blogs</li></Link>
        <li className="pointer text-red-500/70 hover:underline hover:text-red-500" onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </div>
  );
};

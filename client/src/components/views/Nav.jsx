import React from "react";
import logo from "../../assets/logo.png";
import user from "../../assets/user.jpg";
import {Link} from "react-router-dom"
import { useState, useEffect } from "react";
import { YellowButton } from "../layouts/YellowButton";
import { DropDownMenu } from "../layouts/DropDownMenu";
import axios from "axios";

export const Nav = () => {
  const [openProfile, setopenProfile] = useState(false);
  const [isLogin, setisLogin] = useState(false);
  const [User, setUser] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/user/verify",
          { withCredentials: true }
        );

        if (response.data.loggedIn) {
          setisLogin(true);
          setUser(response.data.user);
        } else {
          setisLogin(false);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setisLogin(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <div className="w-screen px-30 py-6 fixed justify-between flex bg-black">
      <Link to="/"><img src={logo} alt="Blogify" className="w-15 h-auto" /></Link>
        {isLogin && (
          <div className="flex gap-5">
            <Link to="/create-blog">
              <YellowButton title='Create Blog'/>
            </Link>
            <img src={user} alt="user" className="w-8 h-8 rounded-full" onClick={() => setopenProfile((open) => !open)} />
            {openProfile && <DropDownMenu name={User?.fullName} email={User?.email}/>}
          </div>
        )}
        {!isLogin && (
          <div className="flex gap-5">
            <Link to="/login">
              <button className="border-amber border-1 bg-transparent text-amber px-3 py-1 rounded-md">
                Login
              </button>
            </Link>
            <Link to="/signup">
            <YellowButton title='Signup'/>
            </Link>
          </div>
        )}
      </div>
  );
};

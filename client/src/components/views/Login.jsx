import { useState, useEffect } from "react";
import { createCookie, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
      const checkLogin = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8001/user/verify",
            { withCredentials: true }
          );
  
          if (response.data.loggedIn) {
            navigate("/");
            window.location.reload();
          }
        } catch (error) {
          console.error("Error verifying token:", error);
        }
      };
  
      checkLogin();
      document.title = "Blogify - Login"
    }, []);

  function onEmailChange(e) {
    setemail(e.target.value);
  }

  function onPassChange(e) {
    setpass(e.target.value);
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (email !== "" && pass !== "") {
        const formData = {
          email: email,
          password: pass,
        };

        try {
          const response = await axios.post(
            "http://localhost:8001/user/login",
            formData,
            { withCredentials: true }
          );
          if (response.status === 200) {
            navigate("/");
            window.location.reload();
          }
        } catch (error) {
          console.error("Error:", error);
          alert("Login failed.");
        }
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="flex min-h-screen max-w-screen items-center justify-center m-auto">
      <div className="bg-gray px-7 py-5 rounded-lg space-y-2">
        <h1 className="text-3xl text-amber font-semibold">Login</h1>
        <p className="text-md text-white/50">Welcome Back to Blogify !!!</p>
        <form onSubmit={handleClick} className="flex flex-col gap-4 mt-8 mb-5 items-center">
          <div className="flex flex-col gap-2">
            <label className="text-sm">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-md h-10 p-3 border-1 rounded-md border-white/50 bg-black/30"
              required
              onChange={onEmailChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your Password"
              className="w-md h-10 p-3 border-1 rounded-md border-white/50 bg-black/30"
              required
              onChange={onPassChange}
            />
          </div>
            <div className="mt-7">
              <button
                type="submit"
                className="bg-amber px-6 py-2 text-black rounded-md font-medium"
              >
                Login
              </button>
            </div>
        </form>
      </div>
    </div>
  );
};

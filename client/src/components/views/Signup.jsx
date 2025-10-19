import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [confirmpass, setconfirmpass] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get("http://localhost:8001/user/verify", {
          withCredentials: true,
        });

        if (response.data.loggedIn) {
          navigate("/");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    };

    checkLogin();
    document.title = "Blogify - Signup"
  }, []);

  function onNameChange(e) {
    setname(e.target.value);
  }

  function onEmailChange(e) {
    setemail(e.target.value);
  }

  function onPassChange(e) {
    setpass(e.target.value);
  }

  function onConfirmPassChange(e) {
    setconfirmpass(e.target.value);
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (name !== "" && email !== "" && pass !== "" && confirmpass !== "") {
      if (pass === confirmpass) {
        const formData = {
          fullName: name,
          email: email,
          password: pass,
        };

        try {
          const response = await axios.post(
            "http://localhost:8001/user/register",
            formData
          );
          if (response.status === 200) {
            navigate("/login");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("Registration failed.");
        }
      } else {
        alert("Passwords don't match");
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="flex min-h-screen max-w-screen items-center justify-center m-auto">
      <div className="bg-gray px-7 py-5 rounded-lg space-y-2">
        <h1 className="text-3xl text-amber font-semibold">Create Account</h1>
        <p className="text-md text-white/50">
          Good to hear your joining Blogify !!!
        </p>
        <form
          className="flex flex-col gap-4 mt-8 mb-5 items-center"
          onSubmit={handleClick}
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your Name"
              className="w-md h-10 p-3 border-1 rounded-md border-white/50 bg-black/30"
              required
              onChange={onNameChange}
            />
          </div>
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
          <div className="flex flex-col gap-2">
            <label className="text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Retype your Password"
              className="w-md h-10 p-3 border-1 rounded-md border-white/50 bg-black/30"
              required
              onChange={onConfirmPassChange}
            />
          </div>

          <div className="mt-7">
            <button
              type="submit"
              className="bg-amber px-6 py-2 text-black rounded-md font-medium"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

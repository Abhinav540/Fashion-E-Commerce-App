import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  
  const email = useRef();
  const pass = useRef();
  const name = useRef();
  const image = useRef();
  
  const navigate = useNavigate();

  // Hardcoded users for demo (no backend needed)
  const DEMO_USERS = [
    {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      password: "john123",
      email: "john@example.com",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      name: "Jane Smith",
      username: "janesmith",
      password: "jane123",
      email: "jane@example.com",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      name: "ABC User",
      username: "abc@gmail.com",
      password: "abc123",
      email: "abc@gmail.com",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 4,
      name: "Demo User",
      username: "demo",
      password: "demo123",
      email: "demo@example.com",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=60"
    }
  ];

  function handleLogin(e) {
    e.preventDefault();
    const username = email.current.value;
    const password = pass.current.value;

    if (username === "" || password === "") {
      alert("Please enter credentials");
      return;
    }

    // Check against hardcoded users
    const user = DEMO_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/home");
    } else {
      alert("Invalid username or password");
    }
  }

  function handleSignup(e) {
    e.preventDefault();
    const username = email.current.value;
    const password = pass.current.value;
    const fullName = name.current.value;
    const userImage = image.current.value;

    if (username === "" || password === "" || fullName === "") {
      alert("Please fill all fields");
      return;
    }

    // Check if username already exists
    const existingUser = DEMO_USERS.find((u) => u.username === username);
    if (existingUser) {
      alert("Username already exists. Please use: demo / demo123");
      return;
    }

    // Create new user and auto-login
    const newUser = {
      id: Date.now(),
      name: fullName,
      username: username,
      password: password,
      email: username,
      image: userImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=60"
    };

    // Add to demo users and log in
    DEMO_USERS.push(newUser);
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    alert("Account created successfully!");
    navigate("/home");
  }

  return (
    <div className="login-container">
      <video autoPlay muted loop className="bg-video">
        <source src="https://www.pexels.com/download/video/853800/" type="video/mp4" />
      </video>
      <div className="overlay"></div>

      <form className="login-form" onSubmit={isSignup ? handleSignup : handleLogin}>
        <h1>{isSignup ? "Create Account" : "Welcome Back"}</h1>
        
        {!isSignup && (
          <p style={{color: '#ccc', fontSize: '0.85rem', marginBottom: '10px', textAlign: 'center'}}>
            Demo: <strong>demo</strong> / <strong>demo123</strong>
          </p>
        )}
        
        {isSignup && (
          <input 
            type="text" 
            placeholder="Full Name" 
            ref={name}
          />
        )}
        
        <input 
          type="text" 
          placeholder="Username / Email" 
          ref={email}
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          ref={pass}
        />

        {isSignup && (
          <input 
            type="text" 
            placeholder="Image URL (optional)" 
            ref={image}
          />
        )}
        
        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>

        <p className="toggle-form">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="toggle-btn"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
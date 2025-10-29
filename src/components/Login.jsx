import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';

function Login() {
  const [users, setUsers] = useState([]);
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const email = useRef();
  const pass = useRef();
  const name = useRef();
  const image = useRef();
  
  const navigate = useNavigate();

  // Load users from JSON file
  useEffect(() => {
    fetch('/users.json')
      .then(res => res.json())
      .then(data => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading users:", err);
        setLoading(false);
      });
  }, []);

  // Save users to localStorage (since we can't modify JSON directly from frontend)
  const saveUsers = (updatedUsers) => {
    localStorage.setItem('appUsers', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  // Get users from localStorage or initial state
  const getUsers = () => {
    const saved = localStorage.getItem('appUsers');
    return saved ? JSON.parse(saved) : users;
  };

  function handleLogin(e) {
    e.preventDefault();
    const username = email.current.value;
    const password = pass.current.value;

    if (username === "" || password === "") {
      window.alert("Please enter credentials");
      return;
    }

    const allUsers = getUsers();
    const user = allUsers.find(u => u.username === username && u.password === password);

    if (user) {
      // Store logged in user info
      localStorage.setItem('loggedInUser', JSON.stringify(user));
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
      window.alert("Please fill all fields");
      return;
    }

    const allUsers = getUsers();
    
    // Check if user already exists
    if (allUsers.find(u => u.username === username)) {
      alert("Username already exists");
      return;
    }

    // Create new user
    const newUser = {
      id: allUsers.length + 1,
      name: fullName,
      username: username,
      password: password,
      email: username,
      image: userImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=60"
    };

    const updatedUsers = [...allUsers, newUser];
    saveUsers(updatedUsers);
    
    alert("Account created successfully! Please login.");
    setIsSignup(false);
    email.current.value = "";
    pass.current.value = "";
    name.current.value = "";
    image.current.value = "";
  }

  if (loading) {
    return <div className="login-container"><p>Loading...</p></div>;
  }

  return (
    <div className="login-container">
      <video autoPlay muted loop className="bg-video">
        <source src="https://www.pexels.com/download/video/853800/" type="video/mp4" />
      </video>
      <div className="overlay"></div>

      <form className="login-form" onSubmit={isSignup ? handleSignup : handleLogin}>
        <h1>{isSignup ? "Create Account" : "Welcome Back"}</h1>
        
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
        
        <button type="submit">
          {isSignup ? "Sign Up" : "Login"}
        </button>

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
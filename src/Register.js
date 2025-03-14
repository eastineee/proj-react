import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [alert, setAlert] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const togglePassword = () => {
  setShowPassword((prev) => !prev);
};

const toggleConfirmPassword = () => {
  setShowConfirmPassword((prev) => !prev);
};


  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(\.[a-zA-Z]{2,3})?$/.test(email);
  };

  const validatePassword = (password) => {
    return password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]{8,15})$/);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    for (let key in data) {
      if (data[key].trim() === "") {
        setAlert("Please fill in all fields.");
        return;
      }
    }

    if (!validateEmail(data.email)) {
      setAlert("Invalid Email Format.");
      return;
    }
    if (!validatePassword(data.password)) {
      setAlert("Password must be 8-15 characters and include a number & symbol.");
      return;
    }
    if (data.password !== data.confirm) {
      setAlert("Passwords do not match!");
      return;
    }

  // 🔹 Get stored users from localStorage
const users = JSON.parse(localStorage.getItem("users")) || [];

// 🔹 Check if username OR email is already taken
const userExists = users.some(
  (user) => user.username === data.username || user.email === data.email
);

if (userExists) {
  setAlert("Username or Email is already taken. Please use a different one.");
  return;
}

// 🔹 If no duplicate, save user
users.push({ username: data.username, email: data.email, password: data.password });
localStorage.setItem("users", JSON.stringify(users));

// 🔹 Store the currently registered user separately for dashboard use
localStorage.setItem("user", JSON.stringify({ username: data.username, email: data.email }));


    setAlert("Registration successful!");
    setTimeout(() => navigate("/dashboard"), 500); // Redirect after 0.5 sec
  };

  const onChangeDataHandler = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="register-container">
      <div className="image-container"></div>
      <div className="register-box">
        <h2>be a pretty capybara</h2>
        <p className="social-login">sign up with</p>
        <div className="social-icons">
        <a href="https://www.facebook.com/" target="_blank" className="social-icon">f</a>
          <a href="https://accounts.google.com/" target="_blank" className="social-icon">G</a>
          <a href="https://twitter.com/" target="_blank" className="social-icon">X</a>
          <a href="https://www.instagram.com/" target="_blank" className="social-icon">i</a>
        </div>

        <form onSubmit={onSubmitHandler}>
          <div className="name-fields">
            <input 
              type="text" 
              placeholder="First Name" 
              name="first_name" 
              value={data.first_name} 
              onChange={onChangeDataHandler} 
            />
            <input 
              type="text" 
              placeholder="Last Name" 
              name="last_name" 
              value={data.last_name} 
              onChange={onChangeDataHandler} 
            />
          </div>

          <input 
            type="text" 
            placeholder="Username" 
            name="username" 
            value={data.username} 
            onChange={onChangeDataHandler} 
          />
          <input 
            type="text" 
            placeholder="Email" 
            name="email" 
            value={data.email} 
            onChange={onChangeDataHandler} 
          />

           {/* PASSWORD FIELD WITH EYE ICON */}
           <div className="password-container">
  <input
    type={showPassword ? "text" : "password"} // ✅ Stays hidden by default
    placeholder="Password"
    name="password"
    value={data.password}
    onChange={onChangeDataHandler}
  />
  <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
    <span className={`eye-shape ${showPassword ? "red-eye" : "white-eye"}`}></span>
  </span>
</div>

<div className="password-container">
  <input
    type={showConfirmPassword ? "text" : "password"} // ✅ Stays hidden by default
    placeholder="Confirm Password"
    name="confirm"
    value={data.confirm}
    onChange={onChangeDataHandler}
  />
  <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
    <span className={`eye-shape ${showConfirmPassword ? "red-eye" : "white-eye"}`}></span>
  </span>
</div>


          <div className="terms-container">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">By signing up you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.</label>
          </div>

          <button type="submit" className="register-btn">Sign Up</button>
        </form>

        {alert && <p className="alert-message">{alert}</p>}

        <p className="login-link">
          Already have an account? <a href="#" onClick={() => navigate("/login")}>Log in here.</a>
        </p>
      </div>
    </div>
  );
}

export default Register;

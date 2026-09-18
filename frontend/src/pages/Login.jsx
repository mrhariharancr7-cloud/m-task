import {useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const  handleLogin = async (e) => {
       e.preventDefault();

       const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
       });

       const data = await response.json();

       if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role" , data.role);

        navigate("/dashboard");
        console.log("Login Successful");
        console.log(data);
       } else {
        setErrorMessage(data.message);
       }
    };


    return(
        <div>
         <button 
          type="button"
          onClick={() => navigate("/")}
          className="fixed top-6 left-6 text-teal-700 font-medium hover:text-teal-900">Back to Home</button>

        <div className="login-page">
            <div className="login-card">
            <h1>M-Task</h1>
            <h2>Login</h2>
        

        <div className="input-group">
           <label>Email:</label>


           <input
             type="email"
             placeholder="Enter your email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             />
        </div>


        <div className="input-group">
            <label>Password:</label>


            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />

        </div>

        {errorMessage && (
            <p className="mt-2 text-sm !text-red-600">
                {errorMessage}
            </p>
        )}

        <button 
        className="login-button"
        onClick={handleLogin}
        >Login</button>
        
        <Link 
        to="/forgot-password"
        className="block mt-3 text-center text-sm text-teal-700 font-medium hover:underline">Forgot Password</Link>

        <p>
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
        </p>
        </div>
       </div>
       </div> 
    );
}

export default Login;
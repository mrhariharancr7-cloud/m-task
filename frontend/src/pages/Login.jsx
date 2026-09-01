import {useState} from "react";
import { Link } from "react-router-dom";


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    return(
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

        <br />

        <div className="input-group">
            <label>Password:</label>


            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />

        </div>

        <br />

        <button className="login-button">login</button>

        <p>
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
        </p>
        </div>
       </div> 
    );
}

export default Login;
import {useState} from "react";


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    return(
        <div>
            <h1>M-Task</h1>
            <h2>Login</h2>
        

        <div>
           <label>Email:</label>


           <input
             type="email"
             placeholder="Enter your email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             />
        </div>

        <br />

        <div>
            <label>Password:</label>


            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />

        </div>

        <br />

        <button>login</button>
        </div>
    );
}

export default Login;
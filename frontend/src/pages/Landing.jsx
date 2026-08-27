import {Link} from "react-router-dom";


function Landing() {
    return (
        <div>
           <h1>welcome to M-Task</h1>
           <p>M-TASK help you to manage your task</p>


           <Link to="/login">
           <button>Login</button>
           </Link>

          
           
        </div>
    );
}

export default Landing;
import {Link} from "react-router-dom";
import "../Landing.css";


function Landing() {
    return (
        <div className="landing-page">


            <nav className="nav-bar">
                <h2>M-Task</h2>

            <div className="nav-links">
                <a href="#features">Features</a>
                <a href="#contact">Contact</a>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>

        <section className="content">

            <div className="lan_content">

                <h1>
                    Manage your Tasks.
                    <br />
                    Stay productive always.
                </h1>

                <p>
                    M-Task help you to organize your daily tasks
                    and keep an eye on your tasks.
                </p>

                <Link to="/login">
                 <button className="primary-button">
                    Login
                 </button>
                </Link>
            </div>

            <div className="dashboard-preview">
                <h3>M-task Dashboard</h3>

                <p>Today Tasks</p>

                <div className="task-item">
                    Complete project
                </div>

                <div className="task-item">
                    Complete workout
                </div>

                <div className="task-item">
                    Learn java 
                </div>

                <div className="task-item">
                    complete assignment
                </div>

                <div className="dashboard-stats">
                    <span className="important">Important: 2</span>
                    <span  className="completed">completed: 2</span>
                </div>
            </div>

        </section>

        <section className="features" id="features">

            <h2>Everything you need to manage Tasks</h2>

            <div className="feature_container">


                <div className="feature-card">
                    <h3>Custom List</h3>
                    <p>Create and organize your tasks into different lists.</p>
                </div>


                <div className="feature-card">
                    <h3>Task Management</h3>
                    <p>Add, edit, delete and complete your tasks easily.</p>
                </div>


                <div className="feature-card">
                    <h3>Important Task</h3>
                    <p>Keep track of the tasks that are most important.</p>
                </div>


                <div className="feature-card">
                    <h3>Due Dates</h3>
                    <p>Set due dates and keep track of your deadlines.</p>
                </div>

                
                <div className="feature-card">
                    <h3>Notes</h3>
                    <p>Add notes and information about your tasks.</p>
                </div>


                <div className="feature-card">
                    <h3>Completed Tasks</h3>
                    <p>View your completed tasks.</p>
                </div>


            </div>
        </section>

        <section className="contact" id="contact">

            <div className="contact-card">

                <div className="cantact-left">

                    <div className="contact-label">
                        Contact & Support
                    </div>

                    <h2>Let us talk.</h2>

                    <p className="contact-description">
                        If you have any questions about M-Task or
                        need help, our M-Task team is here.
                    </p>

                    <a href="mailto:support.m-task@gmail.com"
                    className="contact-button"
                    >
                        Contact Us
                    </a>

                </div>

                <div className="contact-right">

                    <div className="contact-item">
                        <span>General enquiries</span>
                        <p>support.m-task@gmail.com</p>
                    </div>

                    <div className="contact-item">
                        <span>Phone</span>
                         <p>+91 8220952877</p>
                    </div>

                    <div className="contact-item">
                        <span>Support</span>

                        <p>
                            M-Task team is available to help with your enquiries
                        </p>
                    </div>

                    <p className="contact-footer">
                        We respond to all enquiries.
                    </p>

                </div>

            </div>

        </section>

       

        <footer className="footer">
            <div className="footer-content">


                <div className="footer-brand">
                    <h2>M-Task</h2>
                    <p>
                        M-Task helps you to manage your daily task easily
                        and stay organized.
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Product</h3>
                    <a href="#features">Features</a>
                    <a href="#tasks">Tasks</a>
                    <Link to="/login">Login</Link>
                </div>

                <div className="footer-section">
                    <h3>Company</h3>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </div>

                <div className="footer-section">
                    <h3>Contact</h3>
                    <p>support.m-task@gmail.com</p>
                    <p>Mon - Fri, 10:00 AM - 6:00 pm</p>
                </div>


            </div>

            <div className="footer-bottom">
                <p>M-Task. All rights reserved.</p>
                <div>
                    <a href="#privacy">Privacy Policy</a>
                    <a href="#terms">Terms and Conditions</a>
                </div>
            </div>
        </footer>


        </div>
        
        
    );
}

export default Landing;
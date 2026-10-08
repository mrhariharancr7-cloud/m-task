import {Link} from "react-router-dom";
import "./Landing.css";
import Header from "../components/Header";
import Footer from "../components/Footer";


function Landing() {
    return (
        <div className="landing-page">

            <Header />


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

                    <Link to="/contact"
                    className="contact-button"
                    >
                        Contact Us
                    </Link>

                </div>

                <div className="contact-right">

                    <div className="contact-item">
                        <span>General enquiries</span>
                        <p>support.mtask@gmail.com</p>
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

        <Footer />

        </div>
        
        
    );
}

export default Landing;
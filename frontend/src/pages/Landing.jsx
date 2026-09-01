import {Link} from "react-router-dom";


function Landing() {
    return (
        <div className="landing-page">


            <nav className="nav-bar">
                <h2>M-Task</h2>

            <div className="nav-links">
                <a href="#features">Features</a>
                <a href="#contact">Contact</a>
                <Link to="/login">Login</Link>
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
                    and keep eye on tasks.
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
                    <span>Importent: 2</span>
                    <span>completed: 2</span>
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
                    <h3>completed Tasks</h3>
                    <p>view your completed tasks</p>
                </div>


            </div>
        </section>

        <section className="contact" id="contact">

            <div className="contact-card">


                <div className="contact-label">
                    Conatct & Support
                </div>

                <h2>Let us talk.</h2>

                <p className="contact-description">
                    If you have any question about  M-task
                    or need help, our M-task team is here.
                </p>

                <div className="contact-divider"></div>

                <div className="contact-item">

                    <div>
                        <span>General enquiries</span>
                        <p>support.m-task@gmail.com</p>
                    </div>
                </div>

                <div className="contact-item">

                    <div>
                        <span>Phone</span>
                        <p>+91 8220952877</p>
                    </div>
                </div>

                <div className="contact-item">

                    <div>
                        <span>Support</span>
                        <p>M-Task team is available to help with your enquiries</p>
                    </div>
                </div>

                <div className="contact-divider"></div>

                <p className="conatct-footer">
                    We respond to all enquiries.
                </p>

            </div>   

        </section>


        </div>
        
        
    );
}

export default Landing;
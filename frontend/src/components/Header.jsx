import { Link } from "react-router-dom";


function Header() {
    return (
        <nav className="h-20 bg-white flex items-center justify-between px-10">

            <h2 className="text-2xl font-semibold text-teal-800">M-Task</h2>

            <div className="flex items-center gap-8">
                <Link
                to="/"
                className="text-slate-900 hover:text-teal-600">Home</Link>

                <Link
                to="/#features"
                className="text-slate-900 hover:text-teal-600">Features</Link>

                <Link 
                to="/contact"
                className="text-slate-900 hover:text-teal-600">Contact</Link>

                <Link
                to="/login"
                className="text-slate-900 hover:text-teal-600">Login</Link>

                <Link 
                to="/register"
                className="text-slate-900 hover:text-teal-600">Register</Link>
            </div>

        </nav>
    );
}

export default Header;
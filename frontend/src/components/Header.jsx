import { Link, useLocation  } from "react-router-dom";
import { useState } from "react";


function Header() {

    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const isHome = location.pathname === "/" && location.hash !== "#features";
    const isFeatures = location.pathname === "/features";
    const isContact = location.pathname === "/contact";

    const navLinkClass = (isActive) =>
        `px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            isActive
            ? "bg-[#FFF4E5] text-[#E78300]"
            : "text-[#071A3D] hover:text-[#E78300]"}`;
    return (
        <nav className="min-h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-[8%] relative">

            {/*logo*/}
            <Link to="/" className="flex items-center gap-2">

            {/*logo-icon*/}
            <div className="w-7 h-7 bg-[#E78300] rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white text-lg font-bold">✓</span>
            </div>

            {/*logo-name*/}
            <h2 className="text-2xl font-bold text-[#E78300]">M-Task</h2>

            </Link>

            {/*navigation*/}

            <div className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">

                <Link 
                to="/"
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    isHome
                    ? "bg-[#FFF4E5] text-[#E78300]"
                    : "text-[#071A3D] hover:text-[#E78300]"}`}>Home</Link>

                <Link 
                to="/features"
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    location.pathname === "/features"
                    ? "bg-[#FFF4E5] text-[#E78300]"
                    : "text-[#071A3D] hover:text-[#E78300]"}`}>Features</Link>

                <Link 
                to="/contact"
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    isContact
                    ? "bg-[#FFF4E5] text-[#E78300]"
                    : "text-[#071A3D] hover:text-[#E78300]"}`}>Contact</Link>

            </div>

            <div className="hidden lg:flex items-center gap-4">

                <Link 
                to="/login"
                className="px-4 py-2 rounded-lg font-semibold text-[#071A3D] hover:text-[#E78300] transition-colors">Login</Link>

                <Link
                to="/register"
                className="ml-3 bg-[#E78300] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#D97706] transition-colors">
                Get started 
                </Link>
            </div>

            {/*mobile-menu-button*/}
            <button 
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="lg:hidden flex items-center justify-center w-11 h-11 rounded-lg text-[#071A3D] hover:bg-[#FFF4E5] transition-colors"
            >
                <span className="text-3xl leading-none">
                    {menuOpen ? "×" : "☰"}
                </span>
            </button>

            {/*mobile-header-navigation*/}
            {menuOpen && (
                <div 
                id="mobile-navigation"
                className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg px-4 py-4 flex flex-col gap-2 lg:hidden z-50">

                    <Link to="/"
                    onClick={() => setMenuOpen(false)}
                    className={navLinkClass(isHome)}>Home</Link>

                    <Link to="/features"
                    onClick={() => setMenuOpen(false)}
                    className={navLinkClass(location.pathname === "/features")}>Features</Link>

                    <Link to="/contact"
                    onClick={() => setMenuOpen(false)}
                    className={navLinkClass(isContact)}>Contact</Link>

                    <div className="border-t border-slate-200 my-2" />

                    <Link to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-2 rounded-lg font-semibold text-[#071A3D] hover:text-[#E78300] transition-colors">Login</Link>

                    <Link to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="bg-[#E78300] text-white font-bold px-4 py-3 rounded-lg text-center hover:bg-[#D97706] transition-colors">Get Started</Link>

                </div>
            )}

        </nav>
    );
}

export default Header;
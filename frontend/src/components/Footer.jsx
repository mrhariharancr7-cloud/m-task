import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-[#FFF7ED] text-[#172033] border-t border-slate-200 px-4 sm:px-6 lg:px-[8%] pt-12 sm:pt-16 pb-8">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

                <div>
                    <Link to="/" className="flex items-center gap-2 mb-4">
                    {/*logo-icon*/}
                    <div className="w-7 h-7 bg-[#E78300] rounded-lg flex items-center justify-center shadow-sm">
                        <span className="text-white text-lg font-bold">✓</span>
                    </div>

                    {/*logo-name*/}
                    <h2 className="text-xl font-bold text-[#E78300]">M-Task</h2>

                    </Link>

                    <p className="text-sm leading-6 text-slate-600 max-w-xs">
                        M-Task helps you manage your daily tasks easily
                        and stay organized.
                    </p>
                </div>

                <div className="flex flex-col items-start gap-4">
                    <h3 className="text-sm font-bold text-[#071A3D] mb-1">
                        Product
                    </h3>

                    <Link to="/features"
                    className="text-sm text-slate-600 hover:text-[#E78300] transition-colors">Features</Link>

                    <Link to="/login"
                    className="text-sm text-slate-600 hover:text-[#E78300] transition-colors">Login</Link>

                </div>

                <div className="flex flex-col items-start gap-4">
                    <h3 className="text-sm font-bold text-[#071A3D] mb-1">Legal</h3>

                    <a href="#privacy"
                    className="text-sm text-slate-600 hover:text-[#E78300] transition-colors">Privacy Policy</a>

                    <a href="#terms"
                    className="text-sm text-slate-600 hover:text-[#E78300] transition-colors">Terms &amp; Conditions</a>
                </div>

                <div className="flex flex-col items-start gap-4">
                    <h3 className="text-sm font-bold text-[#071A3D] mb-1">Contact</h3>

                    <a href="mailto:support.mtask@gmail.com"
                    className="text-sm text-slate-600 hover:text-[#E78300] transition-colors break-all">
                        support.mtask@gmail.com
                    </a>

                    <a href="tel:+918220952877"
                    className="text-sm text-slate-600 hover:text-[#E78300] transition-colors break-all">
                        +91 8220952877
                    </a>

                    <p className="text-sm text-slate-600">
                        Mon - Fri, 10:00 AM - 6:00 PM
                    </p>
                </div>

            </div>

            <div className="border-t border-slate-200 mt-12 pt-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">

                <p className="text-sm text-slate-500">
                    © {new Date().getFullYear()} M-Task. All rights reserved.
                </p>

                <div className="flex flex-wrap gap-6">
                    <a href="#privacy"
                    className="text-sm text-slate-500 hover:text-[#E78300] transition-colors">Privacy Policy</a>

                    <a href="#terms"
                    className="text-sm text-slate-500 hover:text-[#E78300] transition-colors">Terms &amp; Conditions</a>
                </div>

            </div>

        </footer>
    );
}

export default Footer;
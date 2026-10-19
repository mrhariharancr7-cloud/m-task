import {Link} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Features from "../components/Features";
import UseCases from "../components/UseCases";
import CTA from "../components/CTA";


function Landing() {
    return (
        <div>

            <Header />

            {/*herosection*/}
            <section className="min-h-[650px] flex flex-col lg:flex-row items-center justify-between gap-16 px-[8%] py-20 bg-[#f7fafc]">

                <div className="flex-1 max-w-xl">

                    <h1 className="text-5xl lg:text-6xl font-semibold leading-tight text-[#172033] mb-6">
                        Manage your Tasks.
                        <br />
                        Stay productive always.
                    </h1>

                    <p className="text-lg leading-7 text-slate-500 mb-8">
                        M-task helps you to organize your daily tasks,
                        prioritize what matters, and stay productive
                        and keep an eye on Your tasks.
                    </p>

                    <Link to="/login">
                    <button className="bg-[#E78300] text-white px-7 py-3 rounded-lg text-base hover:bg-[#D97706] transition-colors">
                        Login
                    </button>
                    </Link>

                </div>

               {/*dashboardpreview*/}
               <div className="w-full lg:flex-1 max-w-xl">
                
                <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_15px_40px_rgba(20,33,61,0.08)] overflow-hidden">

                    <div className="bg-[#FFF7ED] px-7 py-6 border-b border-slate-200">

                        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#E78300] mb-2">
                            M-TASK DASHBOARD
                        </p>

                        <h2 className="text-2xl font-bold text-[#071A3D]">
                            Stay organized, stay productive
                        </h2>

                    </div>

                    {/*tasks*/}

                    <div className="p-7">

                        <div className="flex items-center justify-between mb-5">

                            <div>
                                <h3 className="text-lg font-semibold text-[#071A3D]">Today's Tasks</h3>

                                <p className="text-sm text-slate-500">
                                    Keep track of your work
                                </p>
                            </div>

                            <span className="px-3 py-1.5 rounded-lg bg-[#FFF4E5] text-[#E78300] text-sm font-semibold">4 Tasks</span>

                        </div>

                        <div className="flex items-center gap-3 p-4 mb-3 bg-slate-50 border border-slate-200 rounded-xl">

                            <div className="w-5 h-5 rounded-full bg-green-100 border border-green-500 flex items-center justify-center text-green-600 text-xs">
                                ✓
                            </div>

                            <span className="text-[#071A3D] text-sm">Complete project</span>

                        </div>

                        <div className="flex items-center gap-3 p-4 mb-3 bg-slate-50 border border-slate-200 rounded-xl">

                            <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>

                            <span className="text-[#071A3D] text-sm">Prepare presentation</span>

                        </div>

                        <div className="flex items-center gap-3 p-4 mb-3 bg-slate-50 border border-slate-200 rounded-xl">

                            <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>

                            <span className="text-[#071A3D] text-sm">Complete assignment</span>

                        </div>

                        <div className="flex items-center gap-3 p-4 mb-3 bg-slate-50 border border-slate-200 rounded-xl">

                            <div className="w-5 h-5 rounded-full bg-green-100 border border-green-500 flex items-center justify-center text-green-600 text-xs">
                                ✓
                            </div>

                            <span className="text-[#071A3D] text-sm">Complete workout</span>

                        </div>

                        {/*status*/}
                        <div className="grid grid-cols-2 gap-3">

                            <div className="border border-slate-200 rounded-xl p-4">
                                <p className="text-xs text-slate-500 mb-1">Important</p>

                                <p className="text-xl font-bold text-blue-600">2</p>
                            </div>

                            <div className="border border-slate-200 rounded-xl p-4">
                                <p className="text-xs text-slate-500 mb-1">Completed</p>

                                <p className="text-xl font-bold text-green-600">2</p>
                            </div>

                        </div>

                    </div>

                </div>
                </div> 

            </section>

            {/*featuressection*/}
            
            <Features />

            {/*use cases section*/}

            <UseCases />

            {/*CTA section*/}

            <CTA />
        

        <Footer />

        </div>
        
        
    );
}

export default Landing;
import { Link } from "react-router-dom";

function CTA() {
    return (
        <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
            <div className="max-w-6xl mx-auto bg-[#FFF7ED] rounded-3xl px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-14">

                <div className="flex flex-col items-start lg:flex-row lg:items-center justify-between gap-8 lg:gap-10">

                    <div className="max-w-2xl">

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#071A3D] mb-5">
                            Ready to organize your tasks?
                        </h2>

                        <p className="text-base leading-7 text-slate-500 sm:text-lg sm:leading-8 lg:whitespace-nowrap">
                            Take control of your daily tasks, stay focused on your priorities, and achieve with M-Task.
                        </p>

                        <p className="text-sm sm:text-base text-slate-500">
                            One simple platform for your everyday productivity.
                        </p>

                    </div>

                    <Link to="/register"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto shrink-0 bg-[#E78300] text-white font-bold px-7 py-4 rounded-xl hover:bg-[#D97706]
                    transition-colors">
                        Get Started
                        <span aria-hidden="true">→</span>
                    </Link>

                </div>

            </div>
        </section>
    );
}

export default CTA;
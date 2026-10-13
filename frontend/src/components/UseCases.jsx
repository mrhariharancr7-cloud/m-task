const useCases = [
    {
        icon: "01",
        title: "For Students",
        description: "Manage assignments, projects, study tasks, and important deadlines in one place."
    },
    {
        icon: "02",
        title: "For Professionals",
        description: "Organize daily work, prioritize important tasks, and stay on top of deadlines."
    },
    {
        icon: "03",
        title: "For Teams",
        description: "Organize responsibilities, track team tasks, and keep projects moving forward."
    },
    {
        icon: "04",
        title: "Personal Productivity",
        description: "Plan daily activities, organize priorities, and work toward your goals."
    },
    {
        icon: "05",
        title: "For Developers",
        description: "Organize code tasks, prioritize bug fixes, and manage project milestones smoothly."
    }
];

function UseCases() {
    return (

        <section className="bg-[#F7FAFC] px-0 py-16 sm:py-20 lg:py-24 overflow-hidden">

            {/*heading*/}
            <div className="max-w-3xl mx-auto text-center px-4 mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#071A3D] mb-5">
                    Built for the way you work
                </h2>

                <p className="text-base sm:text-lg leading-8 text-slate-500">
                    Whether you are studying, working, M-Task helps you stay organized and productive.
                </p>
            </div>

            {/*usecases-cards*/}
            <div className="use-cases-slider w-full overflow-hidden">
                <div className="use-cases-track flex w-max flex-nowrap">

                    {/*group1*/}
                    <div className="use-cases-group flex shrink-0 flex-nowrap gap-5 pr-5">
                        {useCases.map((item) => (
                            <div key={item.icon}
                            className="use-case-card w-[280px] sm:w-[320px] lg:w-[360px] shrink-0 rounded-2xl border border-slate-200 bg-white p-7 sm:p-8">

                                <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF4D6] text-base font-bold text-[#E78300]">
                                    {item.icon}
                                </div>

                                <h3 className="mb-4 text-xl font-bold text-[#071A3D]">
                                    {item.title}
                                </h3>

                                <p className="text-base leading-7 text-slate-500">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/*group2 for A*/}
                    <div className="use-cases-group flex shrink-0 flex-nowrap gap-5 pr-5"
                    aria-hidden="true">

                        {useCases.map((item) => (
                            <div key={item.icon}
                            className="use-case-card w-[280px] sm:w-[320px] lg:w-[360px] shrink-0 rounded-2xl border border-slate-200 bg-white p-7 sm:p-8">

                                <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF4D6] text-base font-bold text-[#E78300]">
                                    {item.icon}
                                </div>

                                <h3 className="mb-4 text-xl font-bold text-[#071A3D]">
                                    {item.title}
                                </h3>

                                <p className="text-base leading-7 text-slate-500">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
                
            </div>

        </section>
    );
}

export default UseCases;
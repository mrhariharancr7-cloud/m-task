const features = [
    {
        icon: "☰",
        title: "Custom Lists",
        description: "Create and organize your tasks into different lists based on your needs."
    },
    {
        icon: "☑",
        title: "Task Management",
        description: "Add, edit, delete, and complete your tasks easily in one place."
    },
    {
        icon: "★",
        title: "Important Task",
        description: "Mark important tasks and keep track of what needs your attention first."
    },
    {
        icon: "◷",
        title: "Due Dates",
        description: "Set due dates and stay on top of your upcoming deadlines."
    },
    {
        icon: "✓",
        title: "Completed Tasks",
        description: "View your completed tasks and keep track of your progress."
    }
];

function Features() {
    return (

        <section id="features" className="bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">

            {/*heading*/}
            <div className="text-center px-4 mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#071A3D]">
                    Everything you need to manage your tasks
                </h2>

                <p className="mt-4 text-base sm:text-lg text-slate-500">
                    Organize your work, stay focused, and keep track of everything from one simple platform.
                </p>
            </div>

            {/*feature-cards*/}
            <div className="features-slider w-full overflow-hidden">
                <div className="features-track flex w-max flex-nowrap">

                    {/*group1*/}
                    <div className="features-group flex shrink-0 flex-nowrap gap-5 pr-5">

                        {features.map((feature) => (
                            <div key={feature.title}
                            className="feature-card w-[280px] sm:w-[320px] lg:w-[360px] shrink-0 rounded-2xl border border-slate-200 bg-[#F7FAFC] p-7 sm:p-8">

                                <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF4D6] text-2xl text-[#E78300]">
                                    {feature.icon}
                                </div>

                                <h3 className="mb-4 text-xl font-bold text-[#071A3D]">
                                    {feature.title}
                                </h3>

                                <p className="text-base leading-7 text-slate-500">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/*group2 for A*/}
                    <div className="features-group flex shrink-0 flex-nowrap gap-5 pr-5"
                    aria-hidden="true">

                        {features.map((feature) => (
                            <div key={feature.title}
                            className="feature-card w-[280px] sm:w-[320px] lg:w-[360px] shrink-0 rounded-2xl border border-slate-200 bg-[#F7FAFC] p-7 sm:p-8">

                                <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF4D6] text-2xl text-[#E78300]">
                                    {feature.icon}
                                </div>

                                <h3 className="mb-4 text-xl font-bold text-[#071A3D]">
                                    {feature.title}
                                </h3>

                                <p className="text-base leading-7 text-slate-500">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
                
            </div>

        </section>
    );
}

export default Features;
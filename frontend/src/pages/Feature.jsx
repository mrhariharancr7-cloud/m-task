import Header from "../components/Header";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const features = [
    {
        number:"01",
        title: "Task Management",
        description: "Create, edit, organize, and complete your tasks easily from one place.",
        tags: ["Create Tasks", "Edit Tasks", "Delete Tasks"],
    },
    {
        number:"02",
        title: "Custom Lists",
        description: "Organize your daily activities by creating separate lists for different needs.",
        tags: ["Daily Tasks", "Study Lists", "Work Lists"],
    },
    {
        number:"03",
        title: "Important Tasks",
        description: "Mark important tasks so you can focus on your priorities first.",
        tags: ["Important Tasks", "Quick Access"],
    },
    {
        number:"04",
        title: "Due Dates",
        description: "Set due date for your tasks and stay on track with your upcoming work.",
        tags: ["Due Dates", "Time Management"],
    },
    {
        number:"05",
        title: "Progress Tracking",
        description: "Review completed tasks and keep track of your daily productivity.",
        tags: ["Completed Tasks", "Progress"],
    },
    
];

function Feature() {
    return(
        <div className="min-h-screen bg-white">
            <Header />

            <section className="bg-white px-4 py-16 sm:py-20 lg:py-24">

                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="mb-5 text-3xl font-bold leading-tight text-[#071A3D] sm:text-4xl lg:text-5xl">
                        Everything you need to manage your tasks
                    </h1>

                    <p className="text-base leading-7 text-slate-500 sm:text-lg sm:leading-8 lg:whitespace-nowrap">
                        Organize your tasks, manage your priorities, and keep your daily work moving forward with M-Task.
                    </p>
                </div>

            </section>

            <section className="bg-[#FFF7ED] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">

                <div className="mx-auto max-w-6xl">

                    <div className="mb-10 text-center sm:mb-14">
                        <h2 className="mb-4 text-3xl font-bold text-[#071A3D] sm:text-4xl">
                            Everything connected in one place
                        </h2>

                        <p className="mx-auto max-w-6xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8 lg:whitespace-nowrap">
                            Discover the features that help you organize tasks, manage deadlines, and stay productive every day.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {features.map((feature) => (
                            <article key={feature.number}
                            className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#E78300] hover:shadow-lg sm:p-7 lg:p-8 ${
                            feature.number === "05"
                             ? "md:col-span-2 md:mx-auto md:w-1/2" : "" }`}>

                                <div className="absolute left-0 top-0 h-1 w-16 rounded-br-full bg-[#E78300] transition-all duration-300 group-hover:w-28" />

                                <div className="mb-6 flex items-start justify-between gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF4D6] text-sm font-bold text-[#E78300]">
                                        {feature.number}
                                    </div>

                                    <h3 className="pt-2 text-right text-lg font-bold text-[#071A3D] sm:text-xl">
                                        {feature.title}
                                    </h3>
                                </div>

                                <p className="mb-6 text-sm leading-7 text-slate-500 sm:text-base">
                                    {feature.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {feature.tags.map((tag) => (
                                        <span key={tag}
                                        className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 sm:text-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/*CTA-section*/}
            <CTA />

            {/*footer*/}
            <Footer />
        </div>
    );
}

export default Feature;
import Header from "../components/Header";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const aboutfeatures = [
    {
        icon:"✓",
        title:"Easy Task Management",
        description:"Create, edit, organize, and complete your tasks easily in one place.",
    },
    {
        icon:"▤",
        title:"Custom Lists",
        description:"Organize your study, work and personal activities into separate lists.",
    },
    {
        icon:"★",
        title:"Important Tasks",
        description:"Mark important tasks and spend your time on what matters most.",
    },
    {
        icon:"◷",
        title:"Progress Tracking",
        description:"View completed tasks and keep track of your daily progress.",
    },
   
];

function About() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <section className="bg-white px-4 py-16 sm:py-20 lg:py-24">

                <div className="mx-auto max-w-4xl text-center">
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#E78300]">About M-task</p>

                    <h1 className="mb-6 text-3xl font-bold leading-tight text-[#071A3D] sm:text-4xl lg:text-5xl">
                        Simplify Your Day. Achieve More.
                    </h1>

                    <p className="mx-auto max-w-3xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
                        M-Task helps you organize daily tasks, manage priorities,
                        and track your tasks progress - all in one platform.
                    </p>
                </div>
            </section>

            <section className="bg-[#FFF7ED] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">

                <div className="mx-auto max-w-6xl">
                    <div className="mb-10 text-center sm:mb-14">
                        <h2 className="mb-4 text-3xl font-bold text-[#071A3D] sm:text-4xl">
                            Why choose M-Task?
                        </h2>

                        <p className="mx-auto max-w-3xl text-base leading-7 text-slate-500 sm:text-lg">
                            Everything you need to stay organized, focused
                            and productive every day.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {aboutfeatures.map((about) => (
                            <article key={about.title}
                            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all
                            duration-300 hover:-translate-y-1 hover:border-[#E78300] hover:shadow-lg sm:p-6">
                                
                            <div className="absolute left-0 top-0 h-1 w-16 rounded-br-full bg-[#E78300] transition-all duration-300 group-hover:w-28" />

                            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF4D6] text-sm font-bold text-[#E78300]">
                                {about.icon}
                            </div>

                            <h3 className="mb-3 text-xl font-bold text-[#071A3D]">
                                {about.title}
                            </h3>

                            <p className="text-sm leading-7 text-slate-500 sm:text-base">
                                {about.description}
                            </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <div className="h-20 bg-white sm:h-12" />

            <section className="bg-[#FFF7ED] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-15">

                <div className="mx-auto max-w-4xl px-4 py-8 text-center sm:px-10 sm:py-10">
            
                    <h1 className="mb-4 text-3xl font-bold text-orange-400 sm:text-4xl">Our Mission</h1>

                    <h2 className="mb-5 text-2xl font-bold text-[#071A3D] sm:text-3xl">
                        Make Every Day More Productive 
                    </h2>

                    <p className="mx-auto max-w-3xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
                        Our mission is to make everyday task management
                        simple, helping you stay organized, focused and
                        productive.
                    </p>
                </div>
            </section>

            {/*CTA-section*/}
            <CTA />

            {/*footer-section*/}
            <Footer />


        </div>
    );
}

export default About;
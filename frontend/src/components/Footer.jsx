

function Footer() {

    return(

    <footer className="bg-[#111827] text-white px-[8%] pt-12 pb-6">

        <div className="grid grid-cols-4 gap-10">

            <div>
                <h2 className="text-2xl font-medium mb-5">M-Task</h2>

                <p className="text-[#94a3b8] leading-7 max-w-xs">
                    M-Task helps you to manage your daily
                    task easily and stay organized.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-base font-medium text-white">Product</h3>

                <a href="/#features"
                className="text-[#94a3b8]">Features</a>

                <a href="/#features"
                className="text-[#94a3b8]">Tasks</a>

                <a href="/login"
                className="text-[#94a3b8]">Login</a>
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-base font-medium text-white">Company</h3>

                <a href="/"
                className="text-[#94a3b8]">About</a>

                <a href="/contact"
                className="text-[#94a3b8]">Contact</a>

            </div>

            <div>
                <h3 className="text-base font-medium text-white mb-4">Contact</h3>

                <p className="text-[#94a3b8] mb-4">support.mtask@gmail.com</p>

                <p className="text-[#94a3b8]">Mon - Fri, 10:00 AM - 6:00 pm</p>
            </div>

        </div>

        {/*footerbottom*/}

        <div className="border-t border-[#334155] mt-10 pt-6 flex justify-between">

            <p className="text-[#94a3b8]">
                M-Task. All rights reserved.
            </p>

            <div className="flex gap-6">

                <a href="#privacy"
                className="text-[#94a3b8]">Privacy Policy</a>

                <a href="#terms"
                className="text-[#94a3b8]">Terms and Conditions</a>
            </div>

        </div>

    </footer>

    );
}

export default Footer;
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Contact() {

    const [form, setForm] = useState({name: "",email: "",subject: "",message: ""});
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState("");

    const handelSubmit = async (e) => {
        e.preventDefault();

        setSubmitting(true);
        setStatus("");

        try {
            const response = await fetch("http://localhost:5001/api/enquiries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (response.ok) {
                setForm({name: "",email: "",subject: "",message: ""});
                setStatus("Thankyou your enquiry sended successfully.")
            } else {
                setStatus(data.message || "Failed to send your enquiry.")
            }

        } catch (error) {
            console.error("Error sending enquiry:", error);

            setStatus("Failed to send your enquiry.Please try again.");
        }
        setSubmitting(false);
    }


    return (
        <div className="min-h-screen bg-[#f2fbfa]">
            
            <Header />

            {/*contactus-heading*/}

            <div className="max-w-6xl mx-auto px-10 pt-20 pb-8 grid grid-cols-[1fr_1.4fr] gap-8 items-center">

                {/*leftside*/}
                <div className="pt-8">

                    <h1 className="text-5xl font-bold text-slate-900 leading-tight">
                        Let's make a better
                        <br />
                        M-Task experience together.
                    </h1>

                    <p className="mt-6 text-lg text-teal-700 leading-8 max-w-xl">
                        Whenever you have a question about M-Task, need help
                        with your tasks, or want to know more about our
                        features, we like to hear from you.
                    </p>

                </div>

                {/*rightside*/}
                <div className="grid grid-cols-3 gap-5">

                    <div className="bg-white border rounded-2xl p-5 shadow-sm min-h-[150px]">
                        <h3 className="text-lg font-bold text-slate-900">Task  Support</h3>

                        <p className="mt-3 text-sm text-teal-700 leading-6">
                            Get help with managing and organizing your tasks in M-Task.
                        </p>
                    </div>

                    <div className="bg-white border rounded-2xl p-5 shadow-sm min-h-[150px]">
                        <h3 className="text-lg font-bold text-slate-900">Product Guidance</h3>

                        <p className="mt-3 text-sm text-teal-700 leading-6">
                            Learn more about M-Task functionalities and features.
                        </p>
                    </div>

                    <div className="bg-white border rounded-2xl p-5 shadow-sm min-h-[150px]">
                        <h3 className="text-lg font-bold text-slate-900">Our Quick Response</h3>

                        <p className="mt-3 text-sm text-teal-700 leading-6">
                            Send us your enquiry and our team will get back to you.
                        </p>
                    </div>

                </div>

            </div>

            {/*contactus-section*/}

            <div className="max-w-6xl mx-auto px-10 pb-16">

                <div className="grid grid-cols-2 gap-8">

                    {/*contactus-information*/}
                    <div className="bg-[#e0f5f3] rounded-2xl p-8 border border-teal-100 shadow-sm">

                        <h2 className="text-2xl font-bold text-slate-900">Contact Us</h2>

                        <p className="mt-3 text-slate-600 leading-7">
                            If you have any questions about M-Task or need support,
                            our M-Task team is here to help you.
                        </p>

                        <div className="mt-8 pt-6 border-t border-teal-100">

                            <p className="text-xs font-semibold tracking-[0.15em] text-slate-500 uppercase">
                                General Enquiries
                            </p>

                            <p className="mt-2 text-slate-900">
                                support.mtask@gmail.com
                            </p>

                        </div>

                        <div className="mt-8 pt-6 border-t border-[#a39eb8]">

                            <p className="text-xs font-semibold tracking-[0.15em] text-slate-500 uppercase">
                                Phone
                            </p>

                            <p className="mt-2 text-slate-900">
                                +91 8220952877
                            </p>

                        </div>

                        <div className="mt-6 pt-6 border-t border-[#a39eb8]">

                            <p className="text-xs font-semibold tracking-[0.15em] text-slate-500 uppercase">
                                Support
                            </p>

                            <p className="mt-2 text-slate-600 leading-6">
                                Our M-Task team is available to help with
                                your enquiries.
                            </p>

                        </div>

                        <div className="mt-6 pt-6 border-t border-[#a39eb8]">

                            <p className="text-xs font-semibold tracking-[0.15em] text-slate-500 uppercase">
                                Response Time
                            </p>

                            <p className="mt-2 text-slate-600">
                                We aim to respond to all enquiries.
                            </p>

                        </div>

                    </div>

                    {/*enquiry-form*/}
                    <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-200">

                        <h2 className="text-2xl font-bold text-slate-900">
                            Tell us what you need from M-task
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Send us message and our team will contact you
                        </p>

                        <form onSubmit={handelSubmit}>

                        <div className="mt-6">

                            <label className="text-sm font-medium text-slate-700">Name</label>

                            <input 
                                type="text"
                                placeholder="Your name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                                className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-teal-500"
                                 />

                        </div>

                        <div className="mt-4">

                            <label className="text-sm font-medium text-slate-700">Email</label>

                            <input 
                                type="email"
                                placeholder="your@email.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                                className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-teal-500"
                                 />

                        </div>

                        <div className="mt-4">

                            <label className="text-sm font-medium text-slate-700">Subject</label>

                            <input 
                                type="text"
                                placeholder="What about"
                                value={form.subject}
                                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                required
                                className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-teal-500"
                                 />

                        </div>

                        <div className="mt-4">

                            <label className="text-sm font-medium text-slate-700">Message</label>

                            <textarea 
                            rows="4"
                            placeholder="Tell us about your enquiry..."
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            required
                            className="mt-4 w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-teal-500 resize-none"
                            />

                        </div>

                        <button 
                        type="submit"
                        className="mt-6 w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition">
                            Send Message
                        </button>

                        </form>

                        {status && (
                            <p className="mt-4 text-sm text-slate-600">
                                {status}
                            </p>
                        )}

                    </div>

                </div>

            </div>

            <Footer />

        </div>
    );
}

export default Contact;
import { useState } from "react";
import { Link } from "react-router-dom";


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registermessage,setregisterMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setregisterMessage("");
    setIsError(false);

    try{
    const response = await fetch("http://localhost:5001/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      setIsError(false);
      setregisterMessage(data.message || "Registration successful!");
      setName("");
      setEmail("");
      setPassword("");
    } else {
      setIsError(true);
      setregisterMessage(data.message || "Registration failed. Please try again.");
    }

    console.log(data);
  } catch (error) {
    console.error("Registration error:", error);
    setIsError(true);
    setregisterMessage("Unable to connect to the server. Please try again.");
  }
    };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] px-4 py-12 sm:px-6">

            <Link to="/"
            className="fixed left-4 top-5 z-10 inline-flex items-center gap-2 text-sm font-medium text-orange-400 transition-colors hover:text-[#E78300] sm:left-8 sm:top-7">
                Back to Home
            </Link>

            <div className="w-full max-w-md rounded-2xl bg-white px-6 py-8 shadow-lg shadow-slate-900/10 sm:px-8 sm:py-10">
              
              <div className="mb-8 text-center">

                <Link to="/"
                className="mb-5 inline-flex items-center gap-2"
                aria-label="M-Task Home">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E78300] text-2xl font-bold text-white shadow-sm">✓</span>

                    <span className="text-3xl font-bold tracking-tight text-[#071A3D]">M-Task</span>
                </Link>

                <h1 className="text-2xl font-bold text-[#071A3D]">Create your account</h1>

                <p className="mt-2 text-sm text-slate-500">Get started with M-Task</p>
              </div>

            <form onSubmit={handleRegister} className="space-y-5">

                {/*name*/}
                <div>
                    <label htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-[#071A3D]">Name</label>

                    <input 
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#071A3D] outline-none transition-all
                    placeholder:text-slate-400 focus:border-[#E78300] focus:ring-2 focus:ring-orange-100" />
                </div>

                {/*email*/}
                <div>
                    <label htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#071A3D]">Email Address</label>

                    <input 
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#071A3D] outline-none transition-all
                    placeholder:text-slate-400 focus:border-[#E78300] focus:ring-2 focus:ring-orange-100" />
                </div>

                {/*password*/}
                <div>
                    <label htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-[#071A3D]">Password</label>

                    <div className="relative">
                        <input 
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        required
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#071A3D] outline-none transition-all
                        placeholder:text-slate-400 focus:border-[#E78300] focus:ring-2 focus:ring-orange-100" />

                        <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 transition-colors hover:text-[#E78300]">
                            {showPassword ? "Hide" : "Show"}
                        </button>

                    </div>
                    </div>

                    {registermessage && (
                      <p role="status"
                      className={`rounded-lg border px-4 py-3 text-sm ${
                        isError
                        ? "border-red-200 bg-red-50 text-red-600"
                        : "border-green-200 bg-green-50 text-green-700"}`}>{registermessage}</p>
                    )}

                    <button
                    type="submit"
                    className="w-full rounded-lg bg-[#E78300] px-5 py-3 font-bold text-white transition-all duration-200 hover:bg-[#D97706]
                    focus:outline-none focus:ring-4 focus:ring-orange-200 active:scale-[0.99]">Create account</button>
            </form>

            <div className="mt-7 text-center">
              <p className="text-sm text-slate-500">
                Go to{" "}
                <Link to="/login"
                className="font-bold text-[#E78300] transition-colors hover:text-[#D97706] hover:underline">Login</Link>
              </p>
            </div>

            <footer className="mt-8 text-center text-xs text-slate-500">
                © {new Date().getFullYear()} M-Task. All rights reserved.
            </footer>


            </div>
        </div>
  );
}

export default Register;

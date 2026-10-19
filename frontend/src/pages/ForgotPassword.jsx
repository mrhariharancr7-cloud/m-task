import {useState} from "react";
import { useNavigate } from "react-router-dom";



function ForgotPassword() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [resetMessage, setResetMessage] = useState("");

    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    const handelSendOtp = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5001/api/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        });

        const data = await response.json();

        if (response.ok) {
            setMessage(data.message);
            setOtpSent(true);
        } else {
            setMessage(data.message);
        }
    };

    const handelResetPassord = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("Password not match")
            return;
        }

        const response = await fetch("http://localhost:5001/api/verify-otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                otp: otp,
                newPassword: newPassword
            })
        });

        const data = await response.json();
        setResetMessage(data.message);
    };


    return(
        <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 py-12">

            <button
            type="button"
            onClick={() => navigate("/login")}
            className="fixed left-6 top-6 font-medium text-[#E78300] transition-colors hover:text-[#D97706]">Back to Login</button>
            
            <div className="w-full max-w-md rounded-2xl border border-orange-100 bg-white px-6 py-8 shadow-lg shadow-slate-900/10 sm:px-8 sm:py-10">
            
            <div className="mb-8 text-center">

                <div className="mb-5 inline-flex items-center gap-2">
                
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E78300] text-2xl font-bold text-white shadow-sm">✓</span>

                    <span className="text-3xl font-bold tracking-tight text-[#071A3D]">M-Task</span>
                    
                </div>

                <h1 className="text-2xl font-bold text-[#071A3D]">Forgot Password</h1>

              </div>
        

        <div  className="mb-5">
           <label className="mb-2 block text-sm font-semibold text-[#071A3D]">Email Address:</label>


           <input
             type="email"
             placeholder="Enter your email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#071A3D] 
             outline-none transition-all placeholder:text-slate-400 focus:border-[#E78300] focus:ring-2 focus:ring-orange-100"
             />
        </div>

        <button 
        className="mt-2 w-full rounded-lg bg-[#E78300] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#D97706] focus:outline-none focus:ring-4 focus:ring-orange-200"
        onClick={handelSendOtp}>Send OTP</button>

        {message && (
            <p className="mt-3 text-center text-sm font-medium text-[#071A3D]">{message}</p>
        )}

        {otpSent && (
            <div className="mt-5">
                <label className="block mb-2 text-left text-sm font-medium text-gray-700">
                    OTP:
                </label>
                <input 
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#071A3D] 
                outline-none transition-all placeholder:text-slate-400 focus:border-[#E78300] focus:ring-2 focus:ring-orange-100"/>
            </div>
        )}

        {otpSent && (
            <div className="mt-5">
                <label className="block mb-2 text-left text-sm font-medium text-gray-700">
                    New Password:
                </label>
                <input 
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#071A3D] 
                outline-none transition-all placeholder:text-slate-400 focus:border-[#E78300] focus:ring-2 focus:ring-orange-100" />
            </div>
        )}

        {otpSent && (
            <div className="mt-5">
                <label className="block mb-2 text-left text-sm font-medium text-gray-700">
                    Confirm Password:
                </label>
                <input 
                type="password"
                placeholder="Enter confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#071A3D] 
                outline-none transition-all placeholder:text-slate-400 focus:border-[#E78300] focus:ring-2 focus:ring-orange-100"
                 />
            </div>
        )}

        {otpSent && (
            <button 
            className="mt-6 w-full rounded-lg bg-[#E78300] px-4 py-3 font-semibold 
            text-white transition-colors hover:bg-[#D97706] focus:outline-none focus:ring-4 focus:ring-orange-200"
            onClick={handelResetPassord}>Reset Password</button>
        )}

        {resetMessage && (
            <p className="mt-3 text-center text-sm font-medium text-[#071A3D]">
                {resetMessage}
            </p>
        )}

        
        </div>
       </div> 
    );
}

export default ForgotPassword;
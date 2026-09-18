import {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";


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
        <div className="login-page">

            <button
            type="button"
            onClick={() => navigate("/login")}
            className="fixed top-6 left-6 text-teal-700 font-medium hover:text-teal-900">Back to Login</button>
            
            <div className="login-card">
            <h1>M-Task</h1>
            <h4>Forgot password</h4>
        

        <div className="input-group">
           <label>Email:</label>


           <input
             type="email"
             placeholder="Enter your email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             />
        </div>

        <button 
        className="login-button"
        onClick={handelSendOtp}>Send OTP</button>

        {message && (
            <p className="mt-3 text-center text-sm font-medium text-teal-700">{message}</p>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600" />
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600" />
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                 />
            </div>
        )}

        {otpSent && (
            <button 
            className="w-full mt-6 px-4 py-3 bg-teal-700 text-white font-semibold rounded-lg hover:bg-teal-800"
            onClick={handelResetPassord}>Reset Password</button>
        )}

        {resetMessage && (
            <p className="mt-3 text-sm text-teal-700 text-center">
                {resetMessage}
            </p>
        )}

        
        </div>
       </div> 
    );
}

export default ForgotPassword;
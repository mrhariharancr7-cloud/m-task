import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";
import SuperadminDashboard from "./pages/SuperadminDashboard";
import SuperadminUsers from "./pages/SuperadminUsers";
import SuperadminTasks from "./pages/SuperadminTasks";
import SuperadminSettings from "./pages/SuperadminSettings";
import SuperadminReports from "./pages/SuperadminReports";
import ContactUs from "./pages/ContactUs";
import SuperadminContactQueries from "./pages/SuperadminContactQueries";
import SuperadminEnquiryDetails from "./pages/SuperadminEnquiryDetails";
import Feature from "./pages/Feature";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/superadmin" element={<SuperadminDashboard />} />
                <Route path="/superadmin/users" element={<SuperadminUsers />} />
                <Route path="/superadmin/tasks" element={<SuperadminTasks />} />
                <Route path="/superadmin/settings" element={<SuperadminSettings />} />
                <Route path="/superadmin/reports" element={<SuperadminReports />} />
                <Route path="/superadmin/contact-enqueries" element={<SuperadminContactQueries />} />
                <Route path="/superadmin/contact-enqueries/:id" element={<SuperadminEnquiryDetails />} />
                <Route path="/features" element={<Feature />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
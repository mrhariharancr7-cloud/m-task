import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/dashboard/Settings";
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
import About from "./pages/About";
import DashboardLayout from "./components/DashboardLayout";
import { DashboardProvider } from "./context/DashboardContext";
import MyTasks from "./pages/dashboard/MyTasks";
import ImportantTasks from "./pages/dashboard/ImportantTasks";
import CompletedTasks from "./pages/dashboard/CompletedTasks";
import CustomListTasks from "./pages/dashboard/CustomListTasks";
import Calendar from "./pages/dashboard/Calendar";

function App() {
    return (
        <BrowserRouter>
        <DashboardProvider>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<MyTasks />} />
                <Route path="important" element={<ImportantTasks />} />
                <Route path="completed" element={<CompletedTasks />} />
                <Route path="list/:listName" element={<CustomListTasks />} />
                <Route path="settings" element={<Settings />} />
                <Route path="calendar" element={<Calendar />} />
                </Route>
                
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/superadmin" element={<SuperadminDashboard />} />
                <Route path="/superadmin/users" element={<SuperadminUsers />} />
                <Route path="/superadmin/tasks" element={<SuperadminTasks />} />
                <Route path="/superadmin/settings" element={<SuperadminSettings />} />
                <Route path="/superadmin/reports" element={<SuperadminReports />} />
                <Route path="/superadmin/contact-enquiries" element={<SuperadminContactQueries />} />
                <Route path="/superadmin/contact-enquiries/:id" element={<SuperadminEnquiryDetails />} />
                <Route path="/features" element={<Feature />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </DashboardProvider>
        </BrowserRouter>
    );
}

export default App;
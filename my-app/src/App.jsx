import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/RegisterForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import Landing from "./components/landing";
import TeacherDashboard from "./components/TeacherDashboard";
import FileUpload from "./components/FileUpload";
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/reset" element={<ResetPasswordForm />} />
        <Route path="/dashboard" element={<TeacherDashboard />} />
      </Routes>
    </div>
  );
}

import React from "react";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/RegisterForm";
import ResetPasswordForm from "./components/ResetPasswordForm";

export default function App() {
  const [currentForm, setCurrentForm] = React.useState("login");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {currentForm === "login" && (
        <LoginForm
          onSwitchToRegister={() => setCurrentForm("register")}
          onSwitchToReset={() => setCurrentForm("reset")}
        />
      )}
      {currentForm === "register" && (
        <RegisterForm onSwitchToLogin={() => setCurrentForm("login")} />
      )}
      {currentForm === "reset" && (
        <ResetPasswordForm onSwitchToLogin={() => setCurrentForm("login")} />
      )}
    </div>
  );
}

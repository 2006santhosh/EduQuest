import React from "react";

export default function ResetPasswordForm({ onSwitchToLogin }) {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage("Password reset link has been sent to your email");
      setEmail("");
    }, 1500);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Reset Password
          </h2>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700 text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 
                           focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                           outline-none transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg 
                         hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 
                         focus:ring-offset-2 font-medium transition-colors 
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending Reset Link..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Remembered your password?{" "}
              <button
                onClick={onSwitchToLogin}
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right side: image */}
      <div className="w-1/2 flex items-center justify-center bg-gray-900">
        <img
          src="src/assets/logindemo.jpg"
          alt="Login Visual"
          className="max-w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
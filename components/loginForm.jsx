import React from "react";

export default function LoginForm({ onSwitchToRegister, onSwitchToReset }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Login successful (demo)");
    }, 1500);
  };

  return (
    <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Login
      </h2>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 text-sm">
          {error}
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

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 
                       focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                       outline-none transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Don’t have an account?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Register
          </button>
        </p>
        <p className="mt-4">
          <button
            onClick={onSwitchToReset}
            className="text-sm text-gray-500 hover:text-indigo-500"
          >
            Forgot your password?
          </button>
        </p>
      </div>
    </div>
  );
}

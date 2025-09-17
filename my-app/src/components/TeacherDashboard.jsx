// src/components/TeacherDashboard.jsx
import React, { useState, useCallback } from "react";
import {
  Upload,
  Users,
  FileText,
  BarChart2,
  LogOut,
  Menu,
  X,
  User,
  Lock,
  Download,
  Loader,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import loginImage from "../assets/logindemo.jpg"; // adjust path if needed

// === Demo data ===
const quizData = [
  { id: 1, studentName: "John Doe", studentId: "S101", quiz1Score: 85, quiz2Score: 90, grade: "A" },
  { id: 2, studentName: "Jane Smith", studentId: "S102", quiz1Score: 78, quiz2Score: 82, grade: "B" },
  { id: 3, studentName: "Michael Brown", studentId: "S103", quiz1Score: 92, quiz2Score: 88, grade: "A" },
  { id: 4, studentName: "Emily Davis", studentId: "S104", quiz1Score: 70, quiz2Score: 75, grade: "C" },
  { id: 5, studentName: "William Wilson", studentId: "S105", quiz1Score: 88, quiz2Score: 84, grade: "B" },
];

const submissionsData = [
  { id: 1, studentName: "John Doe", quizTitle: "Math Quiz 1", submissionDate: "2023-10-15", score: 85, status: "Graded" },
  { id: 2, studentName: "Jane Smith", quizTitle: "Science Quiz 1", submissionDate: "2023-10-16", score: 78, status: "Graded" },
  { id: 3, studentName: "Michael Brown", quizTitle: "GK Quiz 1", submissionDate: "2023-10-17", score: 92, status: "Graded" },
  { id: 4, studentName: "Emily Davis", quizTitle: "Language Quiz 1", submissionDate: "2023-10-18", score: 70, status: "Pending" },
  { id: 5, studentName: "William Wilson", quizTitle: "Math Quiz 2", submissionDate: "2023-10-19", score: 88, status: "Graded" },
];

const gradeDistribution = [
  { name: "A", value: 40 },
  { name: "B", value: 35 },
  { name: "C", value: 15 },
  { name: "D", value: 10 },
];

const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"];

const TeacherDashboard = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (email === "teacher@school.edu" && password === "password123") {
        setIsAuthenticated(true);
      } else {
        alert("Invalid email or password");
      }
      setIsLoading(false);
    }, 900);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
  };

  // ✅ FILE UPLOAD CONNECTED TO BACKEND
  const handleFileUpload = useCallback(async (event) => {
    const files = Array.from(event.target.files || []);

    for (let f of files) {
      const formData = new FormData();
      formData.append("file", f);

      try {
        const res = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        setUploadedFiles((prev) => [...prev, data]);
      } catch (err) {
        console.error("Upload failed", err);
      }
    }
  }, []);

  const handleExportCSV = () => {
    const headers = ["Student Name", "Student ID", "Quiz 1 Score", "Quiz 2 Score", "Grade"];
    const rows = quizData.map((s) => [s.studentName, s.studentId, s.quiz1Score, s.quiz2Score, s.grade]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "student_performance.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ---------- LOGIN PAGE ----------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex flex-col md:flex-row flex h-screen w-screen fixed top-0 right-0">
        {/* Left: login (half on md+) */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-white to-slate-100 p-6">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Teacher Login</h1>
              <p className="text-sm text-gray-500 mt-1">Enter your credentials to access the dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="teacher@school.edu"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 text-gray-800"
                  />
                  <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 pr-10 text-gray-800"
                  />
                  <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                    aria-label="Toggle password"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition flex items-center justify-center"
              >
                {isLoading ? <Loader className="animate-spin mr-2" size={18} /> : "Login"}
              </button>

              <div className="text-center mt-3">
                <p className="text-sm text-gray-600">
                  demo credentials: <span className="font-mono">teacher@school.edu</span> /
                  <span className="font-mono ml-1">password123</span>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right: image (half on md+) */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 p-6">
          <img
            src={loginImage}
            alt="Login visual"
            className="max-w-full max-h-[90vh] rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>
    );
  }

  // ---------- DASHBOARD (full screen) ----------
  return (
    // ========= UPDATED: top-level uses min-h-screen + h-screen to ensure full viewport coverage =========
    <div className="flex min-h-screen h-screen bg-gray-50 flex h-screen w-screen fixed top-0 right-0">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-xl font-semibold text-gray-800">Teacher Portal</h1>
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)} aria-label="Close sidebar">
            <X size={22} />
          </button>
        </div>

        <nav className="px-4 py-6 space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center px-4 py-2 rounded-lg ${
              activeTab === "dashboard" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <BarChart2 size={18} className="mr-3" />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab("files")}
            className={`w-full flex items-center px-4 py-2 rounded-lg ${
              activeTab === "files" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Upload size={18} className="mr-3" />
            File Management
          </button>

          <button
            onClick={() => setActiveTab("performance")}
            className={`w-full flex items-center px-4 py-2 rounded-lg ${
              activeTab === "performance" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <BarChart2 size={18} className="mr-3" />
            Performance Analytics
          </button>

          <button
            onClick={() => setActiveTab("students")}
            className={`w-full flex items-center px-4 py-2 rounded-lg ${
              activeTab === "students" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Users size={18} className="mr-3" />
            Student Records
          </button>

          <button onClick={handleLogout} className="w-full flex items-center px-4 py-2 rounded-lg text-red-600 hover:bg-red-50">
            <LogOut size={18} className="mr-3" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <button className="md:hidden" onClick={() => setIsSidebarOpen(true)} aria-label="Open sidebar">
                <Menu size={20} />
              </button>
              <h2 className="text-lg font-semibold text-gray-800 capitalize">{activeTab}</h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">T</div>
              <span className="text-gray-700 text-sm">teacher@school.edu</span>
            </div>
          </div>
        </header>

        {/* Content */}
        {/* ========= NOTE: `main` keeps flex-1 and min-h-0 for proper full-height scrolling ========= */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 min-h-0">
          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <Users className="text-blue-600 mr-3" size={28} />
                    <div>
                      <h3 className="text-gray-500 text-sm">Total Students</h3>
                      <p className="text-2xl font-bold text-gray-900">{quizData.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <BarChart2 className="text-green-600 mr-3" size={28} />
                    <div>
                      <h3 className="text-gray-500 text-sm">Average Quiz 1 Score</h3>
                      <p className="text-2xl font-bold text-gray-900">
                        {(quizData.reduce((sum, s) => sum + s.quiz1Score, 0) / quizData.length).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <FileText className="text-purple-600 mr-3" size={28} />
                    <div>
                      <h3 className="text-gray-500 text-sm">Files Uploaded</h3>
                      <p className="text-2xl font-bold text-gray-900">{uploadedFiles.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quiz Score Comparison</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={quizData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="studentName" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="quiz1Score" stroke="#3B82F6" name="Quiz 1 Score" />
                      <Line type="monotone" dataKey="quiz2Score" stroke="#10B981" name="Quiz 2 Score" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={gradeDistribution} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                        {gradeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Submissions</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-6 font-medium text-gray-900">Student</th>
                        <th className="text-left py-3 px-6 font-medium text-gray-900">Quiz</th>
                        <th className="text-left py-3 px-6 font-medium text-gray-900">Date</th>
                        <th className="text-left py-3 px-6 font-medium text-gray-900">Score</th>
                        <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissionsData.map((sub) => (
                        <tr key={sub.id} className="border-b border-gray-100">
                          <td className="py-3 px-6">{sub.studentName}</td>
                          <td className="py-3 px-6">{sub.quizTitle}</td>
                          <td className="py-3 px-6">{new Date(sub.submissionDate).toLocaleDateString()}</td>
                          <td className="py-3 px-6">{sub.score}%</td>
                          <td className="py-3 px-6">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                sub.status === "Graded" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {sub.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === "files" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Files</h3>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
                >
                  <input type="file" multiple accept=".pdf" onChange={handleFileUpload} className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="text-blue-600 mb-3" size={32} />
                    <span className="text-gray-700 font-medium">Drag & drop or click to upload PDFs</span>
                    <span className="text-sm text-gray-500 mt-1">Max file size: 5MB per file</span>
                  </label>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Uploaded Files</h3>
                  <button onClick={handleExportCSV} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Download size={18} className="mr-2" /> Export Student Performance
                  </button>
                </div>

                <div className="space-y-4">
                  {uploadedFiles.length === 0 ? (
                    <div className="text-center py-6 text-gray-500">No files uploaded yet</div>
                  ) : (
                    uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="w-8 h-8 text-blue-600 mr-3" />
                          <div>
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-600">{new Date(file.uploadDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">{file.status}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "performance" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Analytics</h3>
              <p className="text-gray-600">Add more charts or insights here — you can reuse recharts or tables to show analytics.</p>
            </div>
          )}

          {activeTab === "students" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Student Records</h3>
                <button onClick={handleExportCSV} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download size={18} className="mr-2" /> Export as CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Quiz 1</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Quiz 2</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizData.map((s) => (
                      <tr key={s.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">{s.studentName}</td>
                        <td className="py-3 px-4">{s.studentId}</td>
                        <td className="py-3 px-4">{s.quiz1Score}%</td>
                        <td className="py-3 px-4">{s.quiz2Score}%</td>
                        <td className="py-3 px-4">{s.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
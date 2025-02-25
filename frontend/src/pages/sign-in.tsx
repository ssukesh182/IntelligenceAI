import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset previous errors

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("📩 Server Response:", data); // ✅ Debugging

      if (!response.ok) {
        throw new Error(data.error || "Login failed. Please try again.");
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token);
      alert("Login Successful!");

      // ✅ Redirect user to the home page (App page)
      window.location.href = "/"; 
    } catch (err: any) {
      console.error("❌ Login Error:", err.message); // ✅ Debugging
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-purple-700 to-pink-500 items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full">
        {/* Left Section */}
        <div className="w-1/2 bg-gradient-to-r from-indigo-700 to-purple-600 text-white flex flex-col justify-center items-center p-8 rounded-l-lg">
          <h1 className="text-3xl font-bold mb-2">Welcome Page</h1>
          <p className="text-lg">Sign in to continue access</p>
          <div className="mt-6 text-sm">www.yoursite.com</div>
        </div>

        {/* Right Section (Sign In Form) */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-6">Sign In</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form className="flex flex-col" onSubmit={handleSignIn}>
            <label className="text-gray-600 mb-1">Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              required
            />

            <label className="text-gray-600 mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
              required
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 rounded-md mt-4 hover:opacity-90 transition"
            >
              CONTINUE →
            </button>
          </form>

          <p className="text-center text-gray-500 my-4">or Connect with Social Media</p>

          <button className="w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center gap-2 mb-3 hover:bg-blue-600">
            <span>Sign In With Twitter</span>
          </button>

          <button className="w-full bg-blue-700 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-blue-800">
            <span>Sign In With Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SignUp = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const [formData, setFormData] = useState({
    name: "",  
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Signup successful! Redirecting to Sign In.");
        navigate("/sign-in"); // ✅ Fixed navigation issue
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-purple-700 to-pink-500 items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full">
        <div className="w-1/2 bg-gradient-to-r from-indigo-700 to-purple-600 text-white flex flex-col justify-center items-center p-8 rounded-l-lg">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-lg">Sign up to get started</p>
          <div className="mt-6 text-sm">www.yoursite.com</div>
        </div>

        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label className="text-gray-600 mb-1">Full Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your full name"
              required
            />

            <label className="text-gray-600 mb-1">Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              required
            />

            <label className="text-gray-600 mb-1">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Create a password"
              required
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 rounded-md mt-4 hover:opacity-90 transition"
            >
              SIGN UP →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

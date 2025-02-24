const SignUp = () => {
    return (
      <div className="flex min-h-screen bg-gradient-to-r from-purple-700 to-pink-500 items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full">
          {/* Left Section */}
          <div className="w-1/2 bg-gradient-to-r from-indigo-700 to-purple-600 text-white flex flex-col justify-center items-center p-8 rounded-l-lg">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-lg">Sign up to get started</p>
            <div className="mt-6 text-sm">www.yoursite.com</div>
          </div>
  
          {/* Right Section (Sign Up Form) */}
          <div className="w-1/2 p-8">
            <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
  
            <form className="flex flex-col">
              <label className="text-gray-600 mb-1">Full Name:</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your full name"
              />
  
              <label className="text-gray-600 mb-1">Email Address:</label>
              <input
                type="email"
                className="border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
              />
  
              <label className="text-gray-600 mb-1">Password:</label>
              <input
                type="password"
                className="border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Create a password"
              />
  
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 rounded-md mt-4 hover:opacity-90 transition"
              >
                SIGN UP →
              </button>
            </form>
  
            <p className="text-center text-gray-500 my-4">or Sign Up with Social Media</p>
  
            <button className="w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center gap-2 mb-3 hover:bg-blue-600">
              <span>Sign Up With Twitter</span>
            </button>
  
            <button className="w-full bg-blue-700 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-blue-800">
              <span>Sign Up With Facebook</span>
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default SignUp;
  
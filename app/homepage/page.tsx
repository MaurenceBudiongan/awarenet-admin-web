"use client";

const Homepage = () => {
  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-gray-900 text-white flex flex-col p-6 space-y-4">
        <h1 className="text-xl font-bold mb-6">AwareNet Admin</h1>
        <button className="bg-gray-800 hover:bg-green-700 py-2 px-4 rounded text-left">
          Dashboard
        </button>
        <button className="bg-gray-800 hover:bg-green-700 py-2 px-4 rounded text-left">
          User
        </button>
        <button className="bg-gray-800 hover:bg-green-700 py-2 px-4 rounded text-left">
          Feedback
        </button>
        <button className="bg-gray-800 hover:bg-green-700 py-2 px-4 rounded text-left">
          History
        </button>
        <button className="bg-gray-800 hover:bg-green-700 py-2 px-4 rounded text-left">
          Logout
        </button>
      </nav>

      <main className="flex-1 p-8 bg-gray-100">
        <p className="text-green-800 text-xl font-semibold">
          Welcome to AwareNet Admin homepage
        </p>
      </main>
    </div>
  );
};

export default Homepage;

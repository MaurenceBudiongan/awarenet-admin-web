"use client";

const Feedback = () => {
  return (
    <div>
      <p className="ml-10 mt-4 text-4xl font-bold">Feedback Overview</p>
      <div className="flex flex-col ">
        <div className="ml-10 mr-10 mt-10 mb-7 rounded-xl flex space-x-15 ">
          <div className="w-full bg-[#eafef3] rounded-lg space-y-4 h-50 flex flex-col justify-center p-10">
            <p className="text-xl font-semibold ">Total Feedback Entries</p>
            <p className="text-3xl font-bold text-[#05893E]">9</p>
            <p className="text-md text-gray-500">Across all users</p>
          </div>
          <div className="w-full bg-[#eafef3] rounded-lg space-y-4 h-50 flex flex-col justify-center p-10">
            <p className="text-xl font-semibold">Average Rating</p>
            <p className="text-3xl font-bold text-[#05893E]">4.1 / 5</p>
            <p className="text-md text-gray-500">Based on all submissions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;

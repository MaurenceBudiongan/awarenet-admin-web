"use client";

const Feedback = () => {
  return (
    <div>
      <p className="ml-10 mt-4 text-4xl font-bold">Feedback Overview</p>
      <div className="flex flex-col">
        <div className="ml-10 mr-10 mt-10 mb-7 p-4 bg-[#F3F7FC] rounded-xl h-64 flex justify-around gap-y-2">
          <div className="">
            <p>Total Feedback Entries</p>
            <p>9</p>
            <p>Across all users</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;

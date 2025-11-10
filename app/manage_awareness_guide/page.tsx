"use client";

const Manage_Awareness_Guide = () => {
  return (
    <div>
      <p className="ml-10 mt-4 text-4xl font-bold">Manage Awareness Guide</p>
      <div className="ml-10 mr-10 mt-10 mb-7 p-6 rounded-xl h-60 flex flex-col justify-around gap-y-2">
        <div>Fill in the information to create a new Guide, Tips & Tools.</div>
        <div>
          <p>Article Title</p>
          <input
            type="text"
            placeholder="Enter Title"
            className="rounded-sm border-2 border-gray-300 outline-0"
          />
        </div>
        <div>
          <p>Content</p>
          <textarea
            name=""
            id=""
            className="rounded-sm border-2 border-gray-300 outline-0"
          ></textarea>
        </div>
        <div>
          <p>Author</p>
          <input
            type="text"
            className="rounded-sm border-2 border-gray-300 outline-0"
          />
        </div>
        <div>
          <button>Publish Article</button>
        </div>
      </div>
    </div>
  );
};

export default Manage_Awareness_Guide;

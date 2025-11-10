"use client";

const Manage_Awareness_Guide = () => {
  return (
    <div>
      <p className="ml-10 mt-4 text-4xl font-bold">Manage Awareness Guide</p>
      <div className="ml-10 mr-10 mt-10 mb-7 p-6 rounded-xl flex flex-col justify-around gap-y-6">
        <div className="text-[#565d6d] text-sm">
          Fill in the information to create a new Guide, Tips & Tools.
        </div>
        <div className="space-y-3">
          <p className="font-bold">Article Title</p>
          <input
            type="text"
            placeholder="AwareNet: CyberSecurity Awareness"
            className="w-full rounded-sm border border-gray-300 outline-0 placeholder:text-black indent-3"
          />
        </div>
        <div className="space-y-3">
          <p>Content</p>
          <textarea
            name=""
            id=""
            className="w-full rounded-sm border border-gray-300 outline-0"
          ></textarea>
        </div>
        <div className="space-y-3">
          <p className="font-bold">Author</p>
          <input
            type="text"
            className="w-full rounded-sm border border-gray-300 outline-0"
          />
        </div>
        <div>
          <button className="bg-[#7CAD71] rounded-sm font-bold">
            Publish Article
          </button>
        </div>
      </div>
    </div>
  );
};

export default Manage_Awareness_Guide;

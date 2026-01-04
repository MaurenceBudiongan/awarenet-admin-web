"use client";

const Manage_Awareness_Guide = () => {
  return (
    <div className="w-full">
      <p className="mt-4 ml-10 text-lg font-bold sm:text-4xl">
        Manage Awareness Guide
      </p>
      <div className="mt-10 mr-10 mb-7 ml-10 flex flex-col justify-around gap-y-6 rounded-xl p-6">
        <div className="text-sm text-[#565d6d]">
          Fill in the information to create a new Guide, Tips & Tools.
        </div>
        <div className="space-y-3">
          <p className="font-semibold">Article Title</p>
          <input
            type="text"
            placeholder="AwareNet: CyberSecurity Awareness"
            className="w-full rounded-sm border border-gray-300 p-2 indent-3 outline-0"
          />
        </div>
        <div className="space-y-3">
          <p className="font-semibold">Content</p>
          <textarea
            name=""
            id=""
            placeholder="Artificial intelligence is rapidly transforming urban planning and management. This article explores how AI technologies, from predictive analytics to smart sensors, can be harnessed to create more sustainable, efficient, and livable cities. We delve into case studies demonstrating successful implementations in areas such as traffic management, waste optimization, energy consumption, and public safety. The integration of AI promises not only operational efficiencies but also a greener, more resilient urban future. Key challenges include data privacy, ethical considerations, and ensuring equitable access to technology, all of which must be addressed for successful adoption."
            className="h-50 w-full rounded-sm border border-gray-300 p-2 indent-3 outline-0 placeholder:text-justify"
          />
        </div>
        <div className="space-y-3">
          <p className="font-semibold">Author</p>
          <input
            type="text"
            placeholder="Maurence Budiongan"
            className="w-full rounded-sm border border-gray-300 p-2 outline-0"
          />
        </div>
        <div>
          <button className="float-right mt-4 rounded-sm bg-[#7CAD71] p-2 text-white">
            Publish Article
          </button>
        </div>
      </div>
    </div>
  );
};

export default Manage_Awareness_Guide;

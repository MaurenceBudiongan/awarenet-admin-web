"use client";

const Manage_Awareness_Guide = () => {
  return (
    <div className="">
      <p className="ml-10 mt-4 text-4xl font-bold">Manage Awareness Guide</p>
      <div className="ml-10 mr-10 mt-10 mb-7 p-6 rounded-xl flex flex-col justify-around gap-y-6">
        <div className="text-[#565d6d] text-sm">
          Fill in the information to create a new Guide, Tips & Tools.
        </div>
        <div className="space-y-3">
          <p className="font-semibold">Article Title</p>
          <input
            type="text"
            placeholder="AwareNet: CyberSecurity Awareness"
            className="w-full rounded-sm border border-gray-300 outline-0 indent-3 p-2"
          />
        </div>
        <div className="space-y-3">
          <p className="font-semibold">Content</p>
          <textarea
            name=""
            id=""
            placeholder="Artificial intelligence is rapidly transforming urban planning and management. This article explores how AI technologies, from predictive analytics to smart sensors, can be harnessed to create more sustainable, efficient, and livable cities. We delve into case studies demonstrating successful implementations in areas such as traffic management, waste optimization, energy consumption, and public safety. The integration of AI promises not only operational efficiencies but also a greener, more resilient urban future. Key challenges include data privacy, ethical considerations, and ensuring equitable access to technology, all of which must be addressed for successful adoption."
            className="w-full rounded-sm border border-gray-300 outline-0 indent-3 p-2  placeholder:text-justify h-50"
          />
        </div>
        <div className="space-y-3">
          <p className="font-semibold">Author</p>
          <input
            type="text"
            placeholder="Maurence Budiongan"
            className="w-full rounded-sm border border-gray-300 outline-0 p-2"
          />
        </div>
        <div>
          <button className="mt-4 bg-[#7CAD71] rounded-sm  p-2 float-right text-white">
            Publish Article
          </button>
        </div>
      </div>
    </div>
  );
};

export default Manage_Awareness_Guide;

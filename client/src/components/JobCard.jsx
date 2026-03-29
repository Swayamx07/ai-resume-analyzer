import API from "../api";
import { useState } from "react";

export default function JobCard({ job }) {

  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      await API.post("/saved-jobs", job);
      setSaved(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#111114] border border-white/10 rounded-2xl p-5 hover:bg-white/5 transition">

      <h2 className="text-lg font-semibold">{job.title}</h2>
      <p className="text-gray-400 text-sm">{job.company}</p>
      <p className="text-gray-500 text-sm">{job.location}</p>

      <div className="mt-4 flex justify-between items-center">

        <button
          onClick={handleSave}
          className={`text-sm px-3 py-1 rounded ${saved ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
            }`}
        >
          {saved ? "Saved ✓" : "Save"}
        </button>

        <a
          href={job.link}
          target="_blank"
          className="text-blue-400 text-sm"
        >
          Apply →
        </a>

      </div>

    </div>
  );
}
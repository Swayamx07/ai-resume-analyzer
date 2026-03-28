export default function JobCard({ job }) {
  return (
    <div className="bg-[#111114] border border-white/10 rounded-2xl p-5 hover:bg-white/5 transition">

      <h2 className="text-lg font-semibold">
        {job.title}
      </h2>

      <p className="text-gray-400 text-sm mt-1">
        {job.company}
      </p>

      <p className="text-gray-500 text-sm">
        {job.location}
      </p>

      <div className="mt-4 flex justify-between items-center">

        <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
          Real Job
        </span>

        <a
          href={job.link}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-blue-400 hover:underline"
        >
          Apply →
        </a>

      </div>
    </div>
  );
}
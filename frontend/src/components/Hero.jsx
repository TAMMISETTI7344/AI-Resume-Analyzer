import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center bg-slate-900 text-white px-6">
      <h1 className="text-6xl font-extrabold text-cyan-400 text-center">
        Analyze Your Resume with AI
      </h1>

      <p className="mt-6 text-xl text-gray-300 text-center max-w-3xl">
        Upload your resume, get ATS score, identify missing skills,
        and receive AI-powered suggestions to improve your chances
        of getting hired.
      </p>

      <Link
  to="/upload"
  className="mt-8 bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl text-lg font-semibold inline-block"
>
  Upload Resume
</Link>
    </section>
  );
}

export default Hero;
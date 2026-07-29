import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-slate-900 text-white">
      <h1 className="text-2xl font-bold text-cyan-400">
        AI Resume Analyzer
      </h1>

      <div className="space-x-4">
       <Link
  to="/login"
  className="px-4 py-2 bg-cyan-500 rounded-lg hover:bg-cyan-600"
>
  Login
</Link>

       <Link
  to="/register"
  className="px-4 py-2 border border-cyan-500 rounded-lg hover:bg-cyan-500"
>
  Register
</Link>
      </div>
    </nav>
  );
}

export default Navbar;
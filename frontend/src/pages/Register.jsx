function Register() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-xl shadow-xl w-96">
        <h1 className="text-3xl font-bold text-cyan-400 text-center mb-6">
          Register
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded bg-slate-700 text-white outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-slate-700 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded bg-slate-700 text-white outline-none"
        />

        <button className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg text-white font-semibold">
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
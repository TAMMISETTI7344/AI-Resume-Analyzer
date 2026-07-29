import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await axios.post(
"https://ai-resume-analyzer-backend-vob4.onrender.com/upload"        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
console.log(res.data);
console.log(res.data.analysis);
console.log("API Response:");
console.log(JSON.stringify(res.data, null, 2));
      navigate("/dashboard", {
        state: {
          analysis: res.data.analysis,
          file: file,
        },
      });
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-cyan-400 text-center mb-6">
          Upload Resume
        </h1>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full bg-slate-700 text-white p-3 rounded-lg mb-6"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Analyzing..." : "Upload Resume"}
        </button>

        <div className="text-center mt-6">
          <Link to="/" className="text-cyan-400 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Upload;
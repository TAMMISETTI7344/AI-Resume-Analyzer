import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Dashboard() {

 const location = useLocation();

if (!location.state) {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <h1 className="text-3xl text-white">
        No Resume Data. Please upload your resume again.
      </h1>
    </div>
  );
}

const analysis = location.state.analysis;
const file = location.state.file;

  if (!analysis) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <h1 className="text-3xl text-white">
          No Analysis Available
        </h1>
      </div>
    );
  }

  const score = analysis.ats_score;

const downloadResume = () => {
  if (!file) return;

  const url = URL.createObjectURL(file);

  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
};

const downloadReport = () => {
  const pdf = new jsPDF();

  // Blue Header
pdf.setFillColor(37, 99, 235);
pdf.rect(0, 0, 210, 30, "F");

// White Title
pdf.setTextColor(255, 255, 255);
pdf.setFontSize(22);
pdf.setFont("helvetica", "bold");
pdf.text("AI Resume Analysis Report", 20, 20);

// Back to Black
pdf.setTextColor(0, 0, 0);

// Start writing below header
let y = 40;

  // Title
 
  y += 12;

  // Date
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.text(`Generated On: ${new Date().toLocaleString()}`, 20, y);

  y += 15;

  // ATS Score
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.setFillColor(220, 252, 231);
pdf.roundedRect(20, y - 5, 70, 15, 3, 3, "F");
pdf.text(`ATS Score: ${analysis.ats_score}%`, 25, y + 5);
  y += 15;

  // Helper function
  const addSection = (title, items) => {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text(title, 20, y);

    y += 8;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);

    if (items && items.length > 0) {
      items.forEach((item) => {
        if (y > 270) {
          pdf.addPage();
          y = 20;
        }

        const lines = pdf.splitTextToSize(`• ${item}`, 160);

pdf.text(lines, 25, y);

y += lines.length * 7;
      });
    } else {
      pdf.text("No Data Available", 25, y);
      y += 7;
    }

    y += 5;
  };

  // Sections
  addSection("Strengths", analysis.strengths);
  addSection("Weaknesses", analysis.weaknesses);
  addSection("Missing Skills", analysis.missing_skills);
  addSection("Suggestions", analysis.suggestions);
  addSection("Interview Questions", analysis.interview_questions);

  // Job Match
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("AI Job Match", 20, y);

  y += 8;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);

  if (analysis.job_match && analysis.job_match.length > 0) {
    analysis.job_match.forEach((job) => {
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }

      pdf.text(`${job.company} : ${job.score}%`, 25, y);
      y += 7;
    });
  } else {
    pdf.text("No Job Match Available", 25, y);
  }

  pdf.save("AI_Resume_Report.pdf");
};

let scoreColor = "#ef4444";
let status = "Needs Improvement ❌";

  if (score >= 80) {
    scoreColor = "#22c55e";
    status = "Excellent Resume ⭐";
  } else if (score >= 60) {
    scoreColor = "#eab308";
    status = "Good Resume 👍";
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-cyan-400 text-center mb-10">
          ATS Resume Analysis
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Resume Preview */}

          <div className="bg-slate-800 rounded-2xl p-6 shadow-xl">

            <h2 className="text-2xl text-white mb-4">
              Uploaded Resume
            </h2>

            {file ? (
              <iframe
                src={URL.createObjectURL(file)}
                title="Resume"
                className="w-full h-[700px] rounded-lg bg-white"
              />
            ) : (
              <p className="text-gray-400">
                Resume Preview Not Available
              </p>
            )}

          </div>

          {/* Right Side */}

          <div>

            <div className="bg-slate-800 rounded-2xl p-8 shadow-xl mb-6">

              <div className="w-56 mx-auto">

                <CircularProgressbar
                  value={score}
                  text={`${score}%`}
                  styles={buildStyles({
                    textColor: "#ffffff",
                    pathColor: scoreColor,
                    trailColor: "#334155",
                  })}
                />

              </div>

              <h2 className="text-center text-2xl text-white mt-6">
                {status}
              </h2>

            </div>

            <div className="bg-slate-800 rounded-xl p-5 mb-5">
              <h2 className="text-2xl text-green-400 mb-3">
                ✅ Strengths
              </h2>

              <ul className="list-disc pl-6 text-white space-y-2">
                {analysis.strengths?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800 rounded-xl p-5 mb-5">
              <h2 className="text-2xl text-red-400 mb-3">
                ❌ Weaknesses
              </h2>

              <ul className="list-disc pl-6 text-white space-y-2">
                {analysis.weaknesses?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800 rounded-xl p-5 mb-5">
              <h2 className="text-2xl text-yellow-400 mb-3">
                📚 Missing Skills
              </h2>

              <ul className="list-disc pl-6 text-white space-y-2">
                {analysis.missing_skills?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800 rounded-xl p-5">
              <h2 className="text-2xl text-cyan-400 mb-3">
                💡 Suggestions
              </h2>

              <ul className="list-disc pl-6 text-white space-y-2">
                {analysis.suggestions?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="flex gap-4 mt-6">
  <button
  onClick={downloadReport}
  className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg text-white font-semibold"
>
  📄 Download AI Report
</button>

  <button
    onClick={downloadResume}
    className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-white font-semibold"
  >
    ⬇ Download Resume
  </button>
</div>

<div className="bg-slate-800 rounded-xl p-5 mt-6">
  <h2 className="text-2xl text-purple-400 mb-3">
    🎤 AI Interview Questions
  </h2>

  <ul className="list-disc pl-6 text-white space-y-2">
    {analysis.interview_questions?.map((question, index) => (
      <li key={index}>{question}</li>
    ))}
  </ul>
</div>
<div className="bg-slate-800 rounded-xl p-6 mt-6">
  <h2 className="text-3xl text-cyan-400 mb-5">
    🏢 AI Job Match
  </h2>

 {analysis.job_match && analysis.job_match.length > 0 ? (
  analysis.job_match.map((job, index) => (
    <div key={index} className="mb-5">

      <div className="flex justify-between mb-2">
        <span className="text-white font-semibold">
          {job.company}
        </span>

        <span className="text-green-400 font-bold">
          {job.score}%
        </span>
      </div>

      <div className="w-full bg-slate-700 rounded-full h-4">
        <div
          className="bg-cyan-500 h-4 rounded-full"
          style={{ width: `${job.score}%` }}
        ></div>
      </div>

    </div>
  ))
) : (
  <p className="text-gray-400">
    No Job Match Available
  </p>
)}
  
</div>
<div className="bg-slate-800 rounded-xl p-6 mt-6">
  <h2 className="text-3xl text-orange-400 mb-5">
    📊 Resume Analytics
  </h2>

  {analysis.analytics && (
    <>
      {[
        { label: "Skills", value: analysis.analytics.skills },
        { label: "Projects", value: analysis.analytics.projects },
        { label: "Experience", value: analysis.analytics.experience },
        { label: "Education", value: analysis.analytics.education },
        { label: "Resume Format", value: analysis.analytics.resume_format },
      ].map((item, index) => (
        <div key={index} className="mb-5">
          <div className="flex justify-between mb-2">
            <span className="text-white font-semibold">
              {item.label}
            </span>

            <span className="text-orange-400 font-bold">
              {item.value}%
            </span>
          </div>

          <div className="w-full bg-slate-700 rounded-full h-4">
            <div
              className="bg-orange-500 h-4 rounded-full"
              style={{ width: `${item.value}%` }}
            ></div>
          </div>
        </div>
      ))}
    </>
  )}
</div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
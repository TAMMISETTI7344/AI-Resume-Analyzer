function Features() {
  const features = [
    {
      title: "ATS Score",
      desc: "Get an instant ATS compatibility score.",
    },
    {
      title: "Skill Analysis",
      desc: "Find missing technical and soft skills.",
    },
    {
      title: "AI Suggestions",
      desc: "Receive personalized resume improvements.",
    },
  ];

  return (
    <section className="bg-slate-800 py-20 px-6">
      <h2 className="text-4xl font-bold text-center text-cyan-400 mb-12">
        Features
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-slate-900 rounded-xl p-8 shadow-lg hover:scale-105 transition"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              {item.title}
            </h3>

            <p className="text-gray-300">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
"use client";

import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import { useRef } from "react";
import SnakeGame from "../components/SnakeGame";

const profileData = {
  name: "Vidhi Gupta",
  title: "Fraud Analytics Professional | Data Engineer | Python • SQL • ML",
  location: "Jaipur, RJ, India",
  email: "gupta_vidhi@outlook.com",
  linkedin: "https://www.linkedin.com/in/gupta-vidhi1/",
  about: `Fraud analytics professional with 5.5+ years of experience in banking and healthcare. 
Currently a Credit Card Fraud Consultant using SQL and Python to fight financial fraud. 
I enjoy building things — whether workflows, dashboards, or ML pipelines.`,
  skills: [
    "SQL",
    "Python",
    "SAS",
    "AWS",
    "GCP",
    "Flask",
    "Django",
    "Machine Learning",
    "Fraud Detection",
  ],
};

export default function Page() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    const doc = new jsPDF("p", "pt", "a4");
    if (contentRef.current) {
      doc.html(contentRef.current, {
        callback: (pdf) => pdf.save("Vidhi_Gupta_Resume.pdf"),
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-gray-900 flex flex-col items-center justify-start p-10 gap-16">
      {/* Resume Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto p-10 bg-black/70 backdrop-blur-lg rounded-3xl shadow-2xl space-y-10 border-2 border-pink-500"
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            {profileData.name}
          </h1>
          <p className="text-lg text-green-400">{profileData.title}</p>
          <p className="text-sm text-gray-300">{profileData.location}</p>
          <div className="flex justify-center gap-6 text-sm mt-2">
            <a href={`mailto:${profileData.email}`} className="hover:underline">
              {profileData.email}
            </a>
            <a href={profileData.linkedin} target="_blank" className="hover:underline">
              LinkedIn
            </a>
          </div>
        </div>

        {/* About */}
        <section>
          <h2 className="text-2xl font-semibold border-b border-gray-500 pb-2">About</h2>
          <p className="mt-4 text-gray-200 leading-relaxed">{profileData.about}</p>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-semibold border-b border-gray-500 pb-2">Skills</h2>
          <div className="flex flex-wrap gap-3 mt-4">
            {profileData.skills.map((s, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-400 text-xs font-medium shadow-md"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-10">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 rounded-full bg-white/20 border border-white/40 hover:bg-white/40 transition"
          >
            Print Resume
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-2 rounded-full bg-white/20 border border-white/40 hover:bg-white/40 transition"
          >
            Download PDF
          </button>
        </div>
      </motion.div>

      {/* Snake Game Section */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-pink-500 text-xl">🎮 Retro Snake Game</h2>
        <SnakeGame />
      </div>
    </main>
  );
}

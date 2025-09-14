"use client"

import { motion } from "framer-motion"
import { jsPDF } from "jspdf"
import { useRef } from "react"

const profileData = {
  name: "Vidhi Gupta",
  title: "Fraud Analytics Professional | Data Engineer | Python • SQL • ML",
  location: "Jaipur, RJ, India",
  email: "gupta_vidhi@outlook.com",
  phone: "+91-89711 95010",
  linkedin: "https://www.linkedin.com/in/gupta-vidhi1/",
  about: `Fraud analytics professional with 5.5+ years of experience in banking and healthcare. 
  Currently a Credit Card Fraud Consultant using SQL and Python to fight financial fraud. 
  Adept at cross-functional collaboration and delivering actionable insights. 
  Passionate about building automated workflows, dashboards, and elegant scripts to solve complex data problems creatively.`,
  skills: [
    "SQL",
    "Python",
    "C/C++",
    "SAS Enterprise Guide",
    "AWS (Athena)",
    "GCP (BigQuery)",
    "Flask",
    "Django",
    "Git",
    "Machine Learning",
    "Fraud Detection",
    "US Healthcare",
  ],
  experience: [
    {
      role: "Credit Card Fraud Consultant",
      company: "Proclink (Financial Services) – Remote, India",
      period: "Jan 2025 – Present",
      bullets: [
        "Conduct cost-benefit analyses on DRC Chargeback process, saving ~$10k/month.",
        "Implemented data-driven rules shutting down abusive accounts, saving $200K+ annually.",
        "Analyzed behavioral patterns of high-risk accounts to detect and classify claim abuse.",
        "Worked with legal team to enforce account closure policies for severe abuse cases.",
      ],
    },
    {
      role: "Data Analyst",
      company: "EXL Services (Healthcare Industry) – Texas",
      period: "May 2024 – Nov 2024",
      bullets: [
        "Led a small team and supported client interviews for Data Engineer roles.",
        "Built ETL pipelines for Medicaid data using Python and BigQuery.",
        "Automated reporting with Tableau dashboards, reducing manual effort by 60%.",
      ],
    },
    {
      role: "Senior Fraud Analyst",
      company: "Barclays – Noida",
      period: "Feb 2021 – Jul 2022",
      bullets: [
        "Processed daily US Credit Card applications, reducing fraud by 1.5%–2% MoM.",
        "Identified and projected fraud trends across purchase points.",
        "Developed ML models (Decision Trees, Random Forests) with Python & SAS, cutting false positives by 15%.",
      ],
    },
    {
      role: "Business Analyst",
      company: "EXL Services – Noida",
      period: "Sep 2018 – Jan 2021",
      bullets: [
        "Automated reports using SAS & Python, reducing manual time by 83%.",
        "Created SQL stored procedures and PowerBI dashboards for provider insights.",
        "Improved workflows by integrating SAS & Python for automated file migrations.",
      ],
    },
  ],
  education: [
    {
      degree: "Master of Science in Computer Engineering",
      school: "The University of Texas at Dallas, USA",
      period: "Aug 2022 – May 2024",
    },
    {
      degree: "Bachelor of Engineering in Electronics and Instrumentation",
      school: "RV College of Engineering, Bangalore, India",
      period: "Aug 2014 – Jul 2018",
    },
  ],
}

export default function Page() {
  const contentRef = useRef<HTMLDivElement>(null)

  const handleDownloadPDF = () => {
    const doc = new jsPDF("p", "pt", "a4")
    if (contentRef.current) {
      doc.html(contentRef.current, {
        callback: (pdf) => {
          pdf.save("Vidhi_Gupta_Resume.pdf")
        },
        margin: [20, 20, 20, 20],
        autoPaging: "text",
        x: 0,
        y: 0,
        width: 560,
        windowWidth: 900,
      })
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        ref={contentRef}
        className="max-w-5xl mx-auto bg-white/30 backdrop-blur-2xl shadow-xl rounded-3xl p-10 space-y-10 text-white"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold drop-shadow-lg">{profileData.name}</h1>
          <p className="text-lg font-medium">{profileData.title}</p>
          <p className="text-sm text-gray-200">{profileData.location}</p>
          <div className="flex justify-center gap-6 mt-3 text-sm">
            <a href={`mailto:${profileData.email}`} className="hover:underline">
              {profileData.email}
            </a>
            <span>{profileData.phone}</span>
            <a href={profileData.linkedin} target="_blank" className="hover:underline">
              LinkedIn
            </a>
          </div>
        </div>

        {/* About */}
        <section>
          <h2 className="text-xl font-semibold mb-3">About</h2>
          <p className="text-base text-gray-100 leading-relaxed">{profileData.about}</p>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Experience</h2>
          <div className="grid gap-6">
            {profileData.experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/20 rounded-xl p-5 shadow-md"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">{exp.role}</h3>
                  <span className="text-xs text-gray-200">{exp.period}</span>
                </div>
                <p className="text-sm italic">{exp.company}</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-100">
                  {exp.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {profileData.skills.map((s, i) => (
              <span
                key={i}
                className="bg-gradient-to-r from-indigo-400 to-pink-400 text-xs px-4 py-2 rounded-full shadow-md"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Education</h2>
          <div className="grid gap-3">
            {profileData.education.map((ed, i) => (
              <div key={i} className="bg-white/20 p-4 rounded-lg shadow-md">
                <p className="font-medium">{ed.degree}</p>
                <p className="text-sm text-gray-200">
                  {ed.school} ・ {ed.period}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 rounded-xl bg-white/20 border border-white/40 hover:bg-white/40"
          >
            Print Resume
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-2 rounded-xl bg-white/20 border border-white/40 hover:bg-white/40"
          >
            Download PDF
          </button>
        </div>
      </motion.div>
    </main>
  )
}

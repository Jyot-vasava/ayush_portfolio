import React, { useState, useEffect } from "react";
import {
  Linkedin,
  Mail,
  Phone,
  Download,
  Menu,
  X,
  MapPin,
  Send,
  Briefcase,
  Award,
  Droplet,
  Shield,
  Settings,
  TrendingUp,
  Users,
  Target,
  ChevronRight,
  Factory,
  FlaskConical,
  Gauge,
} from "lucide-react";

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setFormStatus({ type: "error", message: "Please fill in all fields" });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({
      type: "info",
      message:
        "Waking up server... This may take 30-60 seconds on first request.",
    });

    try {
      // Increased timeout to 90 seconds for Render cold starts
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 90000);

      const response = await fetch("../api/send-email.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);
        setFormStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.log("Error caught:", error);
      if (error.name === "AbortError") {
        setFormStatus({
          type: "error",
          message:
            "Request timed out. The server might be waking up. Please try again in a moment, or email me directly at ayushpatel3018@gmail.com",
        });
      } else {
        setFormStatus({
          type: "error",
          message:
            "Network error. Please try again or email me directly at ayushpatel3018@gmail.com",
        });
      }
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = [
        "home",
        "about",
        "experience",
        "skills",
        "projects",
        "education",
        "interests",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="bg-black text-gray-100 min-h-screen">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all ${
          scrolled
            ? "bg-black/95 backdrop-blur-sm border-b border-gray-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <a
              href="#home"
              onClick={() => scrollToSection("home")}
              className="text-2xl font-bold"
            >
              Ayush Patel
            </a>
            <div className="hidden md:flex space-x-8">
              {[
                "Home",
                "About",
                "Experience",
                "Skills",
                "Projects",
                "Education",
                "Interests",
                "Contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`transition-colors ${
                    activeSection === item.toLowerCase()
                      ? "text-blue-500"
                      : "text-gray-400 hover:text-blue-500"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            {[
              "Home",
              "About",
              "Experience",
              "Skills",
              "Projects",
              "Education",
              "Interests",
              "Contact",
            ].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left px-6 py-3 hover:bg-gray-800"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-6 pt-20"
      >
        <div className="max-w-5xl mx-auto w-full text-center">
          <p className="text-blue-500 font-semibold mb-4 tracking-wider text-lg">
            CHEMICAL ENGINEER
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            I'm <span className="text-blue-500">Ayush Patel</span>
          </h1>
          <p className="text-2xl md:text-3xl font-bold mb-4">
            Field Executive | Process Engineer
          </p>
          <p className="text-xl text-gray-400 mb-6">
            Reliance Industries Limited (RIL)
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10">
            Chemical Engineering Diploma holder with hands-on experience in
            polypropylene manufacturing, plant operations, and process safety at
            one of India's largest petrochemical facilities.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button
              onClick={() => scrollToSection("experience")}
              className="flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition-all transform hover:scale-105"
            >
              View Experience <ChevronRight size={20} />
            </button>
            <a
              href="/ayush_resume.pdf"
              className="flex items-center gap-2 px-8 py-4 border-2 border-gray-700 hover:border-blue-500 rounded transition-all transform hover:scale-105"
            >
              <Download size={20} /> Download Resume
            </a>
          </div>
          <div className="flex justify-center gap-4">
            {[
              {
                icon: Linkedin,
                link: "https://www.linkedin.com/in/ayush-patel-8a6a9b392/",
              },
              { icon: Mail, link: "mailto:ayushpatel3018@gmail.com" },
              { icon: Phone, link: "tel:+919106568331" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                target={social.link.startsWith("http") ? "_blank" : ""}
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-500 hover:text-white transition-all transform hover:scale-110"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-500 font-semibold mb-4 text-sm tracking-widest">
              ABOUT ME
            </p>
            <h2 className="text-5xl font-bold">
              Process Engineering{" "}
              <span className="text-blue-500">Professional</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-6">Who I Am</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                I hold a Diploma in Chemical Engineering degree from GTU and
                have a strong background in plant operations and process
                engineering. Currently, I work as a Field Executive at Reliance
                Industries Limited, where I have hands-on experience in
                polypropylene manufacturing and process safety.
              </p>
              <p className="text-gray-400 mb-6 leading-relaxed">
                I began my career as a Diploma Engineering Trainee, gaining
                practical exposure to polymerization processes, plant
                operations, and downstream activities. I was promoted to Field
                Executive within a year due to consistent performance and a
                strong commitment to safety.
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                With a safety-first mindset and a zero-incident record, I focus
                on ensuring smooth production operations while maintaining the
                highest HSE standards.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: Factory,
                  title: "Plant Operations",
                  desc: "Polypropylene manufacturing",
                },
                {
                  icon: Shield,
                  title: "Safety First",
                  desc: "Zero-incident record",
                },
                {
                  icon: Settings,
                  title: "Troubleshooting",
                  desc: "Equipment & process",
                },
                {
                  icon: TrendingUp,
                  title: "Process Optimization",
                  desc: "Efficiency & quality",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-black border border-gray-800 rounded-lg p-6 hover:border-blue-500 transition-colors"
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="text-blue-500" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-500 font-semibold mb-4 text-sm tracking-widest">
              WORK EXPERIENCE
            </p>
            <h2 className="text-5xl font-bold mb-4">
              Professional <span className="text-blue-500">Journey</span>
            </h2>
            <p className="text-gray-400">
              Building expertise in petrochemical manufacturing and plant
              operations
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-800"></div>

            <div className="relative mb-12">
              <div className="flex items-start gap-6">
                <div className="relative z-10 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center ">
                  <Briefcase className="text-white" size={24} />
                </div>
                <div className="bg-gray-900 border border-blue-500 rounded-lg p-8 flex-1">
                  <div className="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full mb-4">
                    Current Position
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Field Executive</h3>
                  <p className="text-blue-500 font-semibold text-xl mb-2">
                    Reliance Industries Limited (RIL)
                  </p>
                  <p className="text-gray-400 mb-6">September 2023 - Present</p>

                  <div className="space-y-3 mb-6">
                    {[
                      "Taking ownership of day-to-day plant operations, field monitoring, and coordination with control room to ensure smooth and safe production",
                      "Gained hands-on exposure to troubleshooting and equipment checks, supporting maintenance teams and minimizing production interruptions",
                      "Practiced a strong safety-first approach, actively adhering to HSE standards and fostering a disciplined work culture during shifts",
                      "Collaborated closely with senior engineers and cross-functional teams, contributing to production targets while steadily growing into a more responsible role",
                    ].map((point, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <ChevronRight
                          className="text-blue-500 mt-1 "
                          size={18}
                        />
                        <p className="text-gray-300">{point}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      "Plant Operations",
                      "Field Monitoring",
                      "Process Troubleshooting",
                      "HSE Compliance",
                      "Team Coordination",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-start gap-6">
                <div className="relative z-10 w-16 h-16 bg-gray-800 border-2 border-gray-700 rounded-full flex items-center justify-center ">
                  <Briefcase className="text-blue-500" size={24} />
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 flex-1">
                  <h3 className="text-3xl font-bold mb-2">
                    Diploma Engineer Trainee (DET)
                  </h3>
                  <p className="text-blue-400 font-semibold text-xl mb-2">
                    Reliance Industries Limited (RIL)
                  </p>
                  <p className="text-gray-400 mb-6">
                    September 2023 - September 2024 (1 Year)
                  </p>

                  <div className="space-y-3 mb-6">
                    {[
                      "Completed comprehensive training program building a strong foundation in polypropylene manufacturing",
                      "Learned polymerization processes, plant operations, and downstream activities",
                      "Gained exposure to equipment handling, process monitoring, and safety protocols",
                      "Promoted to Field Executive within one year for consistent performance",
                    ].map((point, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <ChevronRight
                          className="text-blue-400 mt-1 "
                          size={18}
                        />
                        <p className="text-gray-300">{point}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      "Polymerization",
                      "Plant Training",
                      "Equipment Handling",
                      "Safety Protocols",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold mb-8 text-center">
              Key <span className="text-blue-500">Achievements</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Award,
                  title: "Promoted Within a Year",
                  desc: "From DET to Field Executive for consistent performance",
                },
                {
                  icon: Shield,
                  title: "Zero-Incident Record",
                  desc: "Maintained perfect safety record during all assigned shifts",
                },
                {
                  icon: Settings,
                  title: "Shutdown Operations",
                  desc: "Assisted in critical shutdown and startup operations",
                },
              ].map((achievement, i) => (
                <div
                  key={i}
                  className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-500 transition-colors text-center"
                >
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="text-blue-500" size={28} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">
                    {achievement.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{achievement.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-500 font-semibold mb-4 text-sm tracking-widest">
              MY SKILLS
            </p>
            <h2 className="text-5xl font-bold">
              Technical <span className="text-blue-500">Expertise</span>
            </h2>
            <p className="text-gray-400 mt-4">
              Comprehensive skills in chemical engineering and plant operations
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Factory,
                title: "Technical Skills",
                skills: [
                  "Plant Operations",
                  "Material Balance",
                  "Heat & Mass Transfer",
                  "Process Troubleshooting",
                  "MS Excel",
                ],
              },
              {
                icon: Shield,
                title: "Professional Skills",
                skills: [
                  "HSE Practices",
                  "Equipment Handling",
                  "Cost Awareness",
                  "Preventive Maintenance",
                  "Team Collaboration",
                ],
              },
              {
                icon: Users,
                title: "Soft Skills",
                skills: [
                  "Problem-Solving",
                  "Adaptability",
                  "Communication",
                  "Time Management",
                  "Discipline",
                ],
              },
            ].map((cat, i) => (
              <div
                key={i}
                className="bg-black border border-gray-800 rounded-lg p-6 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center gap-3 mb-6">
                  <cat.icon className="text-blue-500" size={24} />
                  <h3 className="text-xl font-bold">{cat.title}</h3>
                </div>
                <div className="space-y-2">
                  {cat.skills.map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <ChevronRight className="text-blue-500" size={16} />
                      <span className="text-gray-300">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12  border-blue-500/30 rounded-lg p-8">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center ">
                <Droplet className="text-blue-500" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Petrochemical Expertise
                </h3>
                <p className="text-gray-300">
                  Specialized in polypropylene manufacturing processes,
                  polymerization, plant operations, and downstream activities at
                  Reliance Industries Limited - one of the world's largest
                  petrochemical facilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-500 font-semibold mb-4 text-sm tracking-widest">
              ACADEMIC PROJECT
            </p>
            <h2 className="text-5xl font-bold mb-4">
              Featured <span className="text-blue-500">Project</span>
            </h2>
            <p className="text-gray-400">
              Comprehensive chemical process design and analysis
            </p>
          </div>

          <div className=" border-gray-800 rounded-lg p-10 hover:border-blue-500 transition-colors">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center ">
                <FlaskConical className="text-blue-500" size={32} />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">
                  Manufacturing Process of KCN (Potassium Cyanide)
                </h3>
                <p className="text-gray-400 text-sm">January 2023 - May 2023</p>
              </div>
            </div>

            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              Comprehensive final year project involving detailed process
              design, material balance modeling, and techno-economic analysis of
              Potassium Cyanide manufacturing routes. The project demonstrated
              advanced understanding of chemical process engineering principles
              and industrial feasibility assessment.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Gauge className="text-blue-500" size={20} />
                </div>
                <h4 className="font-bold mb-2">Material Balance Models</h4>
                <p className="text-gray-400 text-sm">
                  Developed comprehensive models ensuring accurate
                  representation of process flows and mass distribution across
                  alternative manufacturing routes
                </p>
              </div>

              <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="text-blue-500" size={20} />
                </div>
                <h4 className="font-bold mb-2">Techno-Economic Evaluation</h4>
                <p className="text-gray-400 text-sm">
                  Performed detailed evaluations integrating cost estimation
                  with process efficiency to assess industrial feasibility and
                  long-term viability
                </p>
              </div>

              <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Target className="text-blue-500" size={20} />
                </div>
                <h4 className="font-bold mb-2">Process Optimization</h4>
                <p className="text-gray-400 text-sm">
                  Critically analyzed and selected optimal process design,
                  balancing technical performance, economic sustainability, and
                  stringent safety considerations
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "Material Balance",
                "Process Design",
                "Cost Estimation",
                "Safety Analysis",
                "Process Optimization",
                "Techno-Economic Analysis",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-24 px-6 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-500 font-semibold mb-4 text-sm tracking-widest">
              EDUCATION
            </p>
            <h2 className="text-5xl font-bold mb-4">
              Academic <span className="text-blue-500">Background</span>
            </h2>
            <p className="text-gray-400">
              Building expertise in chemical engineering
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-800"></div>
            {[
              {
                current: true,
                title: "Diploma in Chemical Engineering",
                subtitle: "Gujarat Technological University (GTU)",
                school: "N.G. Patel Polytechnic",
                location: "Gujarat, India",
                year: "2020 - 2023",
                cgpa: "8.18 CGPA",
              },
              {
                title: "Secondary School Certificate (SSC)",
                subtitle: "Gujarat Secondary Education Board (GSEB)",
                school: "Reliance Foundation School",
                location: "Jamnagar, Gujarat",
                year: "2020",
                cgpa: "70.66%",
              },
            ].map((edu, i) => (
              <div key={i} className="flex items-center gap-4 mb-12 last:mb-0">
                <div
                  className={`relative z-10 w-16 h-16 ${
                    edu.current
                      ? "bg-blue-500"
                      : "bg-gray-800 border-2 border-gray-700"
                  } rounded-full flex items-center justify-center`}
                >
                  <div
                    className={`w-3 h-3 ${
                      edu.current ? "bg-white" : "bg-blue-500"
                    } rounded-full`}
                  ></div>
                </div>
                <div
                  className={`bg-black border ${
                    edu.current ? "border-blue-500" : "border-gray-800"
                  } rounded-lg p-6 flex-1`}
                >
                  {edu.current && (
                    <div className="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full mb-3">
                      Completed
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{edu.title}</h3>
                  <p className="text-blue-400 font-semibold mb-3">
                    {edu.subtitle}
                  </p>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <MapPin size={14} />
                    <span>{edu.school}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <MapPin size={14} />
                    <span>{edu.location}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-2">{edu.year}</p>
                  {edu.cgpa && (
                    <div className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-sm font-semibold">
                      {edu.cgpa}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interests */}
      <section id="interests" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-500 font-semibold mb-4 text-sm tracking-widest">
              INTERESTS & HOBBIES
            </p>
            <h2 className="text-5xl font-bold mb-4">
              Areas of <span className="text-blue-500">Interest</span>
            </h2>
            <p className="text-gray-400">
              Professional interests and personal pursuits
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Briefcase className="text-blue-500" size={28} />
                Professional Interests
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Petrochemical Technology",
                    desc: "Deep interest in petrochemical processes and polymer manufacturing",
                  },
                  {
                    title: "Process Safety",
                    desc: "Passionate about implementing and improving safety protocols",
                  },
                  {
                    title: "Polymer Processing",
                    desc: "Specialized focus on polymer production and processing techniques",
                  },
                ].map((interest, i) => (
                  <div
                    key={i}
                    className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-500 transition-colors"
                  >
                    <h4 className="text-xl font-bold mb-2">{interest.title}</h4>
                    <p className="text-gray-400 text-sm">{interest.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Users className="text-blue-500" size={28} />
                Personal Hobbies
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: "🏀",
                    title: "Basketball",
                    desc: "Enjoy playing basketball for fitness and teamwork",
                  },
                  {
                    icon: "💪",
                    title: "Gym Enthusiast",
                    desc: "Regular gym workouts to maintain physical and mental fitness",
                  },
                  {
                    icon: "✈️",
                    title: "Travel",
                    desc: "Exploring new places and experiencing different cultures",
                  },
                ].map((hobby, i) => (
                  <div
                    key={i}
                    className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-500 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{hobby.icon}</div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">
                          {hobby.title}
                        </h4>
                        <p className="text-gray-400 text-sm">{hobby.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-500 font-semibold mb-4 text-sm tracking-widest">
              GET IN TOUCH
            </p>
            <h2 className="text-5xl font-bold mb-4">
              Let's <span className="text-blue-500">Connect</span>
            </h2>
            <p className="text-gray-400">
              Interested in collaboration or have opportunities? Feel free to
              reach out!
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-gray-400 mb-8">
                I'm always open to discussing new opportunities, projects, or
                collaborations in the chemical engineering and petrochemical
                industry.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "ayushpatel3018@gmail.com",
                    link: "mailto:ayushpatel3018@gmail.com",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+91 91065 68331",
                    link: "tel:+919106568331",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    value: "linkedin.com/in/ayush-patel",
                    link: "https://www.linkedin.com/in/ayush-patel-8a6a9b392/",
                  },
                ].map((c, i) => (
                  <a
                    key={i}
                    href={c.link}
                    target={c.link.startsWith("http") ? "_blank" : ""}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-black border border-gray-800 rounded-lg hover:border-blue-500 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <c.icon className="text-blue-500" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">{c.label}</p>
                      <p className="font-semibold">{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} />
                <span className="text-sm">Surat, Gujarat, India</span>
              </div>
            </div>
            <div className="bg-black border border-gray-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    className="px-4 py-3 bg-gray-900 border border-gray-800 rounded focus:border-blue-500 focus:outline-none"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    className="px-4 py-3 bg-gray-900 border border-gray-800 rounded focus:border-blue-500 focus:outline-none"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded focus:border-blue-500 focus:outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />
                <textarea
                  placeholder="Your message..."
                  rows="5"
                  value={formData.message}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded focus:border-blue-500 focus:outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>

                {formStatus.message && (
                  <div
                    className={`p-3 rounded ${
                      formStatus.type === "success"
                        ? "bg-green-900/30 text-green-400 border border-green-800"
                        : formStatus.type === "info"
                        ? "bg-blue-900/30 text-blue-400 border border-blue-800"
                        : "bg-red-900/30 text-red-400 border border-red-800"
                    }`}
                  >
                    {formStatus.message}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}{" "}
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>&copy; 2026 Ayush S. Patel - Chemical Engineering Professional</p>
        </div>
      </footer>
    </div>
  );
};



export default Portfolio;

import { useState } from "react";
import {
  Search,
  BookOpen,
  Building2,
  Wifi,
  UserPlus,
  Library,
  CreditCard,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import DashboardLayout from "../../components/students/DashboardLayout";
import { cn } from "../../lib/utils";

const categories = [
  {
    icon: BookOpen,
    color: "text-blue-600",
    bg: "bg-blue-50",
    title: "Academic",
    desc: "Grades, transcripts, course registration, and academic regulations.",
  },
  {
    icon: Building2,
    color: "text-green-600",
    bg: "bg-green-50",
    title: "Facilities",
    desc: "Dormitory issues, cafeteria services, maintenance, and campus safety.",
  },
  {
    icon: Wifi,
    color: "text-purple-600",
    bg: "bg-purple-50",
    title: "ICT Services",
    desc: "Wi-Fi access, student portal logins, email support, and software.",
  },
  {
    icon: UserPlus,
    color: "text-orange-500",
    bg: "bg-orange-50",
    title: "Registration",
    desc: "Enrollment procedures, add/drop periods, and ID card processing.",
  },
  {
    icon: Library,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    title: "Library",
    desc: "Book borrowing, digital resources, study spaces, and library fines.",
  },
  {
    icon: CreditCard,
    color: "text-red-500",
    bg: "bg-red-50",
    title: "Financial",
    desc: "Tuition fees, scholarships, payment plans, and financial clearance.",
  },
];

const faqs = [
  {
    question: "How do I reset my student portal password?",
    answer:
      "Visit the student portal login page and click 'Forgot Password'. Enter your ASTU email address and you will receive a reset link within a few minutes. If you do not receive the email, check your spam folder or contact ICT support.",
  },
  {
    question: "What is the deadline for course registration?",
    answer:
      "Course registration typically opens two weeks before the start of each semester. The add/drop period lasts for the first two weeks of classes. Specific dates are published in the academic calendar.",
  },
  {
    question: "How can I request an official transcript?",
    answer:
      "You can request an official transcript through the registrar's office portal or by visiting in person. Processing takes 3–5 business days.",
  },
  {
    question: "Who do I contact for dormitory maintenance issues?",
    answer:
      "For dormitory maintenance issues, submit a complaint under the 'Facilities' category. For emergencies, contact the campus facilities hotline at 9812.",
  },
];

const KnowledgeBase = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto px-8 py-10 pb-20 space-y-10">
        {/* Search Hero – plain background, dark text (matches mockup) */}
        <div className="text-center space-y-5">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              How can we help you today?
            </h1>
            <p className="text-gray-400 font-medium mt-2">
              Search our knowledge base for answers to your questions and
              helpful guides.
            </p>
          </div>

          {/* Search bar */}
          <div className="flex items-center max-w-2xl mx-auto rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
            <div className="flex-1 flex items-center pl-5 pr-3">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search for articles, guides, or FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent py-4 px-3 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
            </div>
            <button className="bg-[#1e3a8a] hover:bg-blue-950 text-white px-8 py-4 font-bold text-sm transition-colors shrink-0">
              Search
            </button>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <button
              key={cat.title}
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm text-left hover:border-gray-200 hover:shadow-md transition-all duration-200"
            >
              {/* Icon in top-left, small square */}
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-5",
                  cat.bg,
                )}
              >
                <cat.icon size={22} className={cat.color} />
              </div>
              <h3 className="text-base font-black text-gray-900 mb-1.5">
                {cat.title}
              </h3>
              <p className="text-sm font-medium text-gray-400 leading-relaxed">
                {cat.desc}
              </p>
            </button>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-gray-900">
              Frequently Asked Questions
            </h2>
            <button className="text-[#1e3a8a] font-bold text-sm flex items-center gap-1 hover:underline underline-offset-2">
              View all FAQs
              <ExternalLink size={13} />
            </button>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between px-7 py-5 text-left"
                >
                  <span className="text-sm font-bold text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      "text-gray-400 transition-transform duration-300 shrink-0 ml-4",
                      openFaq === index && "rotate-180 text-[#1e3a8a]",
                    )}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-7 pb-5">
                    <div className="h-px bg-gray-100 mb-4" />
                    <p className="text-sm font-medium text-gray-500 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default KnowledgeBase;

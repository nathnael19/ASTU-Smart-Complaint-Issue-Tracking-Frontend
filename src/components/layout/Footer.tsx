import { Facebook, Twitter, Linkedin, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-gray-100 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <Globe size={20} />
            </div>
            <span className="text-lg font-extrabold text-primary">
              ASTU SmartComp
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            The official Issue Tracking and Complaint Management System for
            Adama Science and Technology University.
          </p>
          <div className="flex gap-4">
            {[Facebook, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
                aria-label="Social link"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h6 className="font-bold text-gray-800 mb-6 underline decoration-accent/20 decoration-2 underline-offset-4">
            Platform
          </h6>
          <ul className="space-y-4 text-sm font-medium text-gray-400">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                How it Works
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Submit Report
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Admin Portal
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h6 className="font-bold text-gray-800 mb-6 underline decoration-accent/20 decoration-2 underline-offset-4">
            Support
          </h6>
          <ul className="space-y-4 text-sm font-medium text-gray-400">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Contact Registrar
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                IT Helpdesk
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Knowledge Base
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h6 className="font-bold text-gray-800 mb-6 underline decoration-accent/20 decoration-2 underline-offset-4">
            University
          </h6>
          <ul className="space-y-4 text-sm font-medium text-gray-400">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                ASTU Website
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Campus Map
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Announcements
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Student Union
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs font-bold text-gray-300">
          © 2026 Adama Science and Technology University. All rights reserved.
        </p>
        <div className="flex gap-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

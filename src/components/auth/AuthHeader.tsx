import { Link } from "react-router-dom";

interface AuthHeaderProps {
  actionLabel?: string;
  actionPath?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({
  actionLabel = "Register",
  actionPath = "/register",
}) => {
  return (
    <header className="px-6 py-6 max-w-7xl mx-auto w-full flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <img
          src="/logo.png"
          alt="ASTU Logo"
          className="w-10 h-10 object-contain"
        />
        <div className="flex flex-col -gap-1">
          <span className="text-sm font-black text-[#1e3a8a] uppercase leading-tight tracking-tight">
            ASTU Smart Complaint
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Issue Tracking System
          </span>
        </div>
      </Link>
      <nav className="hidden md:flex items-center gap-8">
        <Link
          to="/"
          className="text-sm font-semibold text-gray-500 hover:text-primary transition-colors"
        >
          Home
        </Link>
        <Link
          to="/help"
          className="text-sm font-semibold text-gray-500 hover:text-primary transition-colors"
        >
          Help Center
        </Link>
        <Link
          to="/contact"
          className="text-sm font-semibold text-gray-500 hover:text-primary transition-colors"
        >
          Contact
        </Link>
        <div className="h-4 w-[1px] bg-gray-200 mx-2" />
        <Link
          to={actionPath}
          className="bg-[#e2e8f0] text-[#1e3a8a] px-6 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors shadow-sm"
        >
          {actionLabel}
        </Link>
      </nav>
    </header>
  );
};

export default AuthHeader;

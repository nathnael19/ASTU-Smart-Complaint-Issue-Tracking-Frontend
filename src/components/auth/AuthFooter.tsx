const AuthFooter = () => {
  return (
    <footer className="py-10 text-center text-xs font-bold text-gray-400/80 uppercase tracking-widest leading-loose">
      <p className="mb-4">
        © 2026 Adama Science and Technology University. All rights reserved.
      </p>
      <div className="flex items-center justify-center gap-6">
        <a href="#" className="hover:text-primary transition-colors">
          Privacy Policy
        </a>
        <span className="w-1 h-1 bg-gray-200 rounded-full" />
        <a href="#" className="hover:text-primary transition-colors">
          Terms of Service
        </a>
      </div>
    </footer>
  );
};

export default AuthFooter;

import React from "react";

const CTA = () => {
  return (
    <section className="py-24 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-primary mb-8">
          Ready to improve campus life?
        </h2>
        <p className="text-lg text-gray-500 mb-12">
          Join thousands of students and staff members who are helping build a
          better university environment through active communication and
          transparency.
        </p>
        <button className="px-12 py-5 bg-primary text-white rounded-2xl font-black text-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all">
          Access Dashboard
        </button>
      </div>
    </section>
  );
};

export default CTA;

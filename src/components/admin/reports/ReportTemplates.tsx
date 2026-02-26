import { Calendar, BarChart3, TrendingUp, Users } from "lucide-react";

const templates = [
  {
    title: "Monthly Performance",
    description:
      "Summary of resolution times and volumes for the current month.",
    icon: Calendar,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Departmental Efficiency",
    description:
      "Comparative analysis of performance across university schools.",
    icon: BarChart3,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Resolution Trends",
    description: "Long-term tracking of issues and successful resolutions.",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Staff Workload Report",
    description: "Detailed audit of ticket distribution among staff members.",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

const ReportTemplates = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {templates.map((template) => (
        <div
          key={template.title}
          className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div
            className={`${template.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}
          >
            <template.icon className={`${template.color}`} size={24} />
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-2 truncate">
            {template.title}
          </h3>
          <p className="text-sm font-medium text-gray-500 leading-relaxed line-clamp-2">
            {template.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReportTemplates;

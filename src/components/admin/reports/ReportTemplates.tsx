import { Calendar, BarChart3, TrendingUp, Users, Download } from "lucide-react";
import { exportToCSV, todayString } from "../../../lib/exportUtils";
import {
  getDashboardSummary,
  getCategoryStats,
  getTrendStats,
} from "../../../api/analytics";
import { useState } from "react";

type TemplateKey = "monthly" | "departmental" | "trends" | "workload";

const templates: {
  key: TemplateKey;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}[] = [
  {
    key: "monthly",
    title: "Monthly Performance",
    description:
      "Summary of resolution times and volumes for the current month.",
    icon: Calendar,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    key: "departmental",
    title: "Departmental Efficiency",
    description:
      "Comparative analysis of performance across university schools.",
    icon: BarChart3,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    key: "trends",
    title: "Resolution Trends",
    description: "Long-term tracking of issues and successful resolutions.",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    key: "workload",
    title: "Staff Workload Report",
    description: "Detailed audit of ticket distribution among staff members.",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

const ReportTemplates = () => {
  const [loadingKey, setLoadingKey] = useState<TemplateKey | null>(null);

  const handleTemplateClick = async (key: TemplateKey) => {
    setLoadingKey(key);
    try {
      const [summary, categories, trends] = await Promise.all([
        getDashboardSummary(),
        getCategoryStats(),
        getTrendStats(),
      ]);

      if (key === "monthly") {
        exportToCSV(`monthly-performance-${todayString()}`, [
          {
            title: "Monthly Performance Summary",
            rows: [
              { Metric: "Total Complaints", Value: summary.total_complaints },
              { Metric: "Resolution Rate", Value: summary.resolution_rate },
              {
                Metric: "Avg. Resolution Time",
                Value: summary.avg_resolution_time,
              },
              { Metric: "Active Users", Value: summary.active_users },
            ],
          },
          {
            title: "Monthly Trends",
            rows: trends.map((t) => ({
              Month: t.month,
              "Complaints Received": t.count,
            })),
          },
        ]);
      } else if (key === "departmental") {
        exportToCSV(`departmental-efficiency-${todayString()}`, [
          {
            title: "Category Breakdown",
            rows: categories.map((c) => ({
              Category: c.category.replace(/_/g, " "),
              Count: c.count,
            })),
          },
        ]);
      } else if (key === "trends") {
        exportToCSV(`resolution-trends-${todayString()}`, [
          {
            title: "Resolution Trends (Last 6 Months)",
            rows: trends.map((t) => ({
              Month: t.month,
              "Complaints Received": t.count,
            })),
          },
          {
            title: "Overall Stats",
            rows: [
              { Metric: "Resolution Rate", Value: summary.resolution_rate },
              {
                Metric: "Avg. Resolution Time",
                Value: summary.avg_resolution_time,
              },
            ],
          },
        ]);
      } else if (key === "workload") {
        exportToCSV(`staff-workload-${todayString()}`, [
          {
            title: "System Overview (Workload Proxy)",
            rows: [
              {
                Metric: "Total Complaints (System)",
                Value: summary.total_complaints,
              },
              { Metric: "Active Users", Value: summary.active_users },
              { Metric: "Resolution Rate", Value: summary.resolution_rate },
              {
                Metric: "Avg. Resolution Time",
                Value: summary.avg_resolution_time,
              },
            ],
          },
          {
            title: "Complaints by Category",
            rows: categories.map((c) => ({
              Category: c.category.replace(/_/g, " "),
              Count: c.count,
            })),
          },
        ]);
      }
    } catch (err) {
      console.error("Template export failed:", err);
    } finally {
      setLoadingKey(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {templates.map((template) => {
        const isLoading = loadingKey === template.key;
        return (
          <button
            key={template.key}
            onClick={() => handleTemplateClick(template.key)}
            disabled={loadingKey !== null}
            className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group text-left disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5"
          >
            <div
              className={`${template.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <template.icon className={`${template.color}`} size={24} />
              )}
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-2 truncate flex items-center gap-2">
              {template.title}
              <Download
                size={14}
                className="text-gray-300 group-hover:text-gray-500 transition-colors shrink-0"
              />
            </h3>
            <p className="text-sm font-medium text-gray-500 leading-relaxed line-clamp-2">
              {isLoading ? "Downloading..." : template.description}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default ReportTemplates;

import { cn } from "../../../lib/utils";

interface ToggleProps {
  active: boolean;
  onClick: () => void;
}

const SettingsToggle = ({ active, onClick }: ToggleProps) => (
  <button
    onClick={onClick}
    className={cn(
      "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
      active ? "bg-blue-600" : "bg-gray-200",
    )}
  >
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
        active ? "translate-x-5" : "translate-x-0",
      )}
    />
  </button>
);

export default SettingsToggle;

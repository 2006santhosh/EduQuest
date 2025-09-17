import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: "games" | "lessons";
}

export const SectionHeader = ({ title, subtitle, icon: Icon, color }: SectionHeaderProps) => {
  const colorClasses = {
    games: "text-games bg-games/10",
    lessons: "text-lessons bg-lessons/10",
  };

  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
};
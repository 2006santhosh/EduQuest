import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: "games" | "lessons" | "success" | "primary";
}

export const StatsCard = ({ title, value, icon: Icon, color }: StatsCardProps) => {
  const colorClasses = {
    games: "text-games bg-games/10 border-games/20",
    lessons: "text-lessons bg-lessons/10 border-lessons/20",
    success: "text-success bg-success/10 border-success/20",
    primary: "text-primary bg-primary/10 border-primary/20",
  };

  return (
    <Card className="hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-slide-up">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
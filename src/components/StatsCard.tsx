import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  className?: string;
}

const StatsCard = ({ title, value, icon: Icon, trend, className = "" }: StatsCardProps) => {
  return (
    <div className={`card-float p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-center mt-2">
            <p className="text-2xl font-bold text-foreground counter-animate">{value}</p>
            {trend && (
              <span className="ml-2 text-xs font-medium text-success">
                {trend}
              </span>
            )}
          </div>
        </div>
        <div className="ml-4">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
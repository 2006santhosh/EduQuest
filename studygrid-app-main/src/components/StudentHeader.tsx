import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudentHeaderProps {
  studentName: string;
  studentAvatar?: string;
}

export const StudentHeader = ({ studentName, studentAvatar }: StudentHeaderProps) => {
  return (
    <header className="bg-card border-b border-border p-4 shadow-card">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Student Dashboard
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 pl-4 border-l border-border">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{studentName}</p>
              <p className="text-xs text-muted-foreground">Student</p>
            </div>
            <Avatar className="h-9 w-9">
              <AvatarImage src={studentAvatar} alt={studentName} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {studentName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Calendar, User } from "lucide-react";

interface LessonCardProps {
  title: string;
  description: string;
  subject: string;
  uploadDate: string;
  teacherName: string;
  fileSize: string;
  fileType: "PDF" | "DOC" | "PPT" | "VIDEO";
  downloaded: boolean;
  onDownload: () => void;
}

export const LessonCard = ({ 
  title, 
  description, 
  subject, 
  uploadDate, 
  teacherName, 
  fileSize, 
  fileType, 
  downloaded,
  onDownload 
}: LessonCardProps) => {
  const fileTypeColors = {
    PDF: "bg-destructive text-destructive-foreground",
    DOC: "bg-primary text-primary-foreground",
    PPT: "bg-accent text-accent-foreground",
    VIDEO: "bg-games text-games-foreground",
  };

  return (
    <Card className="group hover:shadow-lessons transition-all duration-300 hover:-translate-y-2 animate-bounce-in">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-lessons transition-colors">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {description}
              </p>
            </div>
            <Badge className={fileTypeColors[fileType]}>
              {fileType}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <Badge variant="secondary" className="text-xs">
                {subject}
              </Badge>
              <span className="text-muted-foreground">{fileSize}</span>
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <User className="h-3 w-3 mr-1" />
                {teacherName}
              </div>
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {uploadDate}
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full bg-gradient-lessons hover:shadow-lessons transition-all duration-300 group-hover:scale-105"
            onClick={onDownload}
            variant={downloaded ? "secondary" : "default"}
          >
            <Download className="h-4 w-4 mr-2" />
            {downloaded ? "Downloaded" : "Download Lesson"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
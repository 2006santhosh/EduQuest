import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Trophy, Clock } from "lucide-react";

interface GameCardProps {
  title: string;
  description: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: string;
  completed: boolean;
  image?: string;
  onPlay: () => void;
}

export const GameCard = ({ 
  title, 
  description, 
  category, 
  difficulty, 
  duration, 
  completed,
  image,
  onPlay 
}: GameCardProps) => {
  const difficultyColors = {
    Easy: "bg-success text-success-foreground",
    Medium: "bg-accent text-accent-foreground",
    Hard: "bg-destructive text-destructive-foreground",
  };

  return (
    <Card className="group hover:shadow-games transition-all duration-300 hover:-translate-y-2 animate-bounce-in cursor-pointer overflow-hidden">
      <div className="relative">
        <div className="h-32 bg-gradient-games rounded-t-lg flex items-center justify-center">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <Play className="h-12 w-12 text-games-foreground opacity-80" />
          )}
        </div>
        {completed && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-success text-success-foreground">
              <Trophy className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-games transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {description}
            </p>
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
            <div className="flex items-center space-x-2">
              <Badge className={difficultyColors[difficulty]}>
                {difficulty}
              </Badge>
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {duration}
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full bg-gradient-games hover:shadow-games transition-all duration-300 group-hover:scale-105"
            onClick={onPlay}
          >
            <Play className="h-4 w-4 mr-2" />
            {completed ? "Play Again" : "Start Game"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
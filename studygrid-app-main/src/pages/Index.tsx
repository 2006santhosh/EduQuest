import { useState } from "react";
import { StudentHeader } from "@/components/StudentHeader";
import { StatsCard } from "@/components/StatsCard";
import { GameCard } from "@/components/GameCard";
import { LessonCard } from "@/components/LessonCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Gamepad2, BookOpen, Award, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [downloadedLessons, setDownloadedLessons] = useState<Set<string>>(new Set());

  // Mock data
  const games = [
    {
      id: "1",
      title: "Math Quest",
      description: "Solve mathematical puzzles and equations in this exciting adventure game",
      category: "Mathematics",
      difficulty: "Medium" as const,
      duration: "15 min",
      completed: true,
    },
    {
      id: "2", 
      title: "Word Builder",
      description: "Enhance your vocabulary by building words and solving language puzzles",
      category: "Language Arts",
      difficulty: "Easy" as const,
      duration: "10 min",
      completed: false,
    },
    {
      id: "3",
      title: "Science Lab",
      description: "Conduct virtual experiments and learn scientific concepts",
      category: "Science",
      difficulty: "Hard" as const,
      duration: "25 min",
      completed: false,
    },
    {
      id: "4",
      title: "History Timeline",
      description: "Travel through time and learn about historical events",
      category: "History",
      difficulty: "Medium" as const,
      duration: "20 min",
      completed: true,
    },
  ];

  const lessons = [
    {
      id: "1",
      title: "Introduction to Algebra",
      description: "Learn the fundamentals of algebraic expressions and equations",
      subject: "Mathematics",
      uploadDate: "2024-01-15",
      teacherName: "Ms. Johnson",
      fileSize: "2.5 MB",
      fileType: "PDF" as const,
    },
    {
      id: "2",
      title: "Creative Writing Workshop",
      description: "Develop your creative writing skills with practical exercises",
      subject: "English",
      uploadDate: "2024-01-12",
      teacherName: "Mr. Davis",
      fileSize: "1.8 MB",
      fileType: "DOC" as const,
    },
    {
      id: "3",
      title: "Photosynthesis Process",
      description: "Understanding how plants convert sunlight into energy",
      subject: "Biology",
      uploadDate: "2024-01-10",
      teacherName: "Dr. Smith",
      fileSize: "5.2 MB",
      fileType: "PPT" as const,
    },
    {
      id: "4",
      title: "World War II Documentary",
      description: "A comprehensive video about the events of World War II",
      subject: "History",
      uploadDate: "2024-01-08",
      teacherName: "Prof. Wilson",
      fileSize: "125 MB",
      fileType: "VIDEO" as const,
    },
  ];

  const handlePlayGame = (gameId: string, title: string) => {
    toast({
      title: "Starting Game",
      description: `Loading ${title}...`,
    });
  };

  const handleDownloadLesson = (lessonId: string, title: string) => {
    setDownloadedLessons(prev => new Set([...prev, lessonId]));
    toast({
      title: "Download Started",
      description: `Downloading ${title}...`,
    });
  };

  const completedGames = games.filter(game => game.completed).length;
  const totalLessons = lessons.length;

  return (
    <div className="min-h-screen bg-background">
      <StudentHeader studentName="Alex Chen" />
      
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Stats Overview */}
        <section className="animate-slide-up">
          <h2 className="text-xl font-semibold text-foreground mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatsCard
              title="Available Games"
              value={games.length}
              icon={Gamepad2}
              color="primary"
            />
            <StatsCard
              title="Lessons Downloaded"
              value={downloadedLessons.size}
              icon={BookOpen}
              color="lessons"
            />
          </div>
        </section>

        {/* Games Section */}
        <section>
          <SectionHeader
            title="Educational Games"
            subtitle="Interactive learning games to enhance your skills"
            icon={Gamepad2}
            color="games"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map((game, index) => (
              <div key={game.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <GameCard
                  {...game}
                  onPlay={() => handlePlayGame(game.id, game.title)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Lessons Section */}
        <section>
          <SectionHeader
            title="Lesson Materials"
            subtitle="Download and access lesson materials from your teachers"
            icon={BookOpen}
            color="lessons"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <LessonCard
                  {...lesson}
                  downloaded={downloadedLessons.has(lesson.id)}
                  onDownload={() => handleDownloadLesson(lesson.id, lesson.title)}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;

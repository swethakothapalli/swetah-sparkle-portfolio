
import { Progress } from "@/components/ui/progress";

interface Skill {
  name: string;
  level: number;
  category: "Technologies" | "Data Science" | "Soft Skills";
}

const SkillsSection = () => {
  const skills: Skill[] = [
    { name: "Python", level: 95, category: "Technologies" },
    { name: "Pandas", level: 90, category: "Technologies" },
    { name: "Scikit-learn", level: 85, category: "Technologies" },
    { name: "TensorFlow/PyTorch", level: 80, category: "Technologies" },
    { name: "SQL", level: 85, category: "Technologies" },
    { name: "Data Visualization", level: 90, category: "Data Science" },
    { name: "Machine Learning", level: 85, category: "Data Science" },
    { name: "Statistical Analysis", level: 80, category: "Data Science" },
    { name: "Natural Language Processing", level: 75, category: "Data Science" },
    { name: "Time Series Analysis", level: 80, category: "Data Science" },
    { name: "Problem Solving", level: 95, category: "Soft Skills" },
    { name: "Communication", level: 90, category: "Soft Skills" },
    { name: "Team Collaboration", level: 85, category: "Soft Skills" },
  ];
  
  const categories = ["Technologies", "Data Science", "Soft Skills"];
  
  return (
    <section className="section">
      <div className="container-content">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-2">My Skills</h2>
          <div className="h-1 w-20 bg-primary rounded-full mx-auto"></div>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            The tools, technologies, and approaches I use to solve complex data problems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {categories.map((category) => (
            <div key={category} className="animate-fade-in">
              <h3 className="font-display text-xl font-semibold mb-6">{category}</h3>
              <div className="space-y-6">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-8 bg-secondary/50 rounded-lg flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="font-display text-xl font-semibold mb-2">Looking for a skilled Data Scientist?</h3>
            <p className="text-muted-foreground">Let's discuss how I can help solve your data challenges!</p>
          </div>
          <a
            href="/contact"
            className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-medium"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
